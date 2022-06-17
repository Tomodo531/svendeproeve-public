<?php

namespace App\Http\Controllers;

use App\Models\Fine;
use App\Models\PremadeFine;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\PremadeFineRequest;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;

class PremadeFineController extends Controller
{
    /**
     * Return a paginated list of premade fines
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $premadeFines = PremadeFine::query()
        ->filter( request(['search']))
        ->paginate(100);

        return response()->json($premadeFines);
    }

    /**
     * Return specific premadefine based on id
     *
     * @param $id
     * @return JsonResponse
     */
    public function getSpecificPremadeFine($id): JsonResponse
    {
        $premadeFine = PremadeFine::query()->findOrFail($id);

        return response()->json($premadeFine);
    }

    /**
     * Creates a new premade fine
     *
     * @param PremadeFineRequest $request
     * @return Application|ResponseFactory|Response
     */
    public function create(PremadeFineRequest $request): Response|Application|ResponseFactory
    {
        $data = $request->validated();

        PremadeFine::query()->create([
            'title' => $data['title'],
            'description' => $data['description'],
            'amount' => $data['amount']
        ]);

        return response(['status' => 'Premade fine created successfully!'], 200);
    }

    /**
     * Update a premade fine
     *
     * @param $id
     * @param PremadeFineRequest $request
     */
    public function update($id, PremadeFineRequest $request): Response|Application|ResponseFactory
    {
        $data = $request->validated();

        PremadeFine::query()
            ->findOrFail($id)
            ->update([
                'title' => $data['title'],
                'description' => $data['description'],
                'amount' => $data['amount']
            ]);

        return response(['status' => 'Premade fine updated successfully!'], 200);
    }

    /**
     * Delete premadefine based on id
     *
     * @param $id
     * @return Response
     */
    public function delete($id): Response
    {
        $premadeFine = PremadeFine::query()->findOrFail($id);

        Fine::query()
            ->where('premade_fine_id', $id)
            ->update(['premade_fine_id' => null]);


        $premadeFine->delete();

        return response()->noContent();
    }
}
