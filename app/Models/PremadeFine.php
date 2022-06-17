<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PremadeFine extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'amount'
    ];

    public function fine(): HasMany
    {
        return $this->hasMany(Fine::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, fn($query, $search) =>
            $query->where(fn($query) =>
                $query->where('title', 'like', '%' . $search . '%')
            )
        );
    }
}
