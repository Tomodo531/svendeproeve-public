<?php

namespace App\Http\Controllers;

use App\Helpers\UserHelper;
use App\Http\Requests\FineRequest;
use App\Models\Fine;
use App\Enums\FineStatusEnum;
use App\Models\User;
use App\Services\BalanceService;
use App\Services\FineService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FineController extends Controller
{
    /**
     * Return a paginated list of fines with recipient/User data
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $fines = Fine::query()
            ->filter( request(['search']))
            ->with(['user' => function ($query) {
                $query->select('id', 'name');
            }])
            ->paginate(100);

        return response()->json($fines);
    }

    /**
     * Return a users latest fines
     *
     * @return JsonResponse
     */
    public function getLatestFines(): JsonResponse
    {
        $latestFines = Fine::query()
            ->where('user_id', Auth::id())
            ->with(['user' => function ($query) {
                $query->select('id', 'name');
            }])
            ->take(5)
            ->get();

        ray($latestFines);

        return response()->json($latestFines);
    }

    /**
     * Return the top 10 contributors based on sum of all received fines
     *
     * @return JsonResponse
     */
    public function getTopContributors(): JsonResponse
    {
        $balance = BalanceService::GetGrandtotalBalance();

        $topContributers = Fine::query()
            ->select('user_id', DB::raw(sprintf("FLOOR((SUM(amount)/%u*100)) as contribution, SUM(amount) as sum", $balance)))
            ->groupBy('user_id')
            ->orderBy('contribution', 'desc')
            ->with('user:id,name,tag')
            ->take(10)
            ->get();

        return response()->json($topContributers);
    }

    /**
     * Return specific fine based on its id
     *
     * @param $id
     * @return JsonResponse
     */
    public function getSpecificFine($id): JsonResponse
    {
        $fine = Fine::query()
            ->with(['user' => function ($query) {
                $query->select('id', 'name');
            }])
            ->findOrFail($id);

        return response()->json($fine);
    }

    /**
     * Return all user specific fines based on user id
     *
     * @param $id
     * @return JsonResponse
     */
    public function getUserSpecificFines($id): JsonResponse
    {
        User::query()->findOrFail($id);

        $fines = Fine::query()
            ->where('user_id', $id)
            ->with(['user' => function ($query) {
                $query->select('id', 'name');
            }])
            ->paginate(100);

        return response()->json($fines);
    }

    /**
     * Create a fine foreach fine in request array
     *
     * @param FineRequest $request
     * @return Response
     */
    public function create(FineRequest $request): Response
    {
        $data = $request->validated();

        abort_if(
            !UserHelper::exists($data['user_id']),
            404,
            sprintf('User with id %c do not exist', $data['user_id'])
        );

        foreach ($data['fines'] as $fine) {
            ray($fine['amount']);
            Fine::query()->create([
                'user_id' => $data['user_id'],
                'premade_fine_id' => $fine['id'],
                'title' => $fine['title'],
                'description' => $fine['description'],
                'amount' => (double) $fine['amount'],
                'status' => FineStatusEnum::WAITING
            ]);
        }

        return response()->noContent();
    }

    /**
     * Patch status of fine based on fine id to PENDING
     *
     * @param $id
     * @return Response
     */
    public function setFineStatusPending($id): Response
    {
        try{
            FineService::patchFineStatus(FineStatusEnum::PENDING, $id);
        }catch (ModelNotFoundException $ex) {
            abort(404, $ex->getMessage());
        }

        return response()->noContent();
    }

    /**
     * Patch status of fine based on fine id to PAID
     *
     * @param $id
     * @return Response
     */
    public function setFineStatusPaid($id): Response
    {
        try{
            FineService::patchFineStatus(FineStatusEnum::PAID, $id);
        }catch (ModelNotFoundException $ex) {
            abort(404, $ex->getMessage());
        }

        return response()->noContent();
    }

    /**
     * Patch status of fine based on fine id to REJECTED
     *
     * @param $id
     * @return Response
     */
    public function setFineStatusRejected($id): Response
    {
        try{
            FineService::patchFineStatus(FineStatusEnum::REJECTED, $id);
        }catch (ModelNotFoundException $ex) {
            abort(404, $ex->getMessage());
        }

        return response()->noContent();
    }

    /**
     * Delete fine based on fine id
     *
     * @param $id
     * @return Response
     */
    public function delete($id) {
        Fine::query()->findOrFail($id)->delete();

        return response()->noContent();
    }
}
