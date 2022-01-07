<?php

namespace App\Traits;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

trait ApiResponder
{
  private function successResponse($data, $code)
  {
    return response()->json($data, $code);
  }

  protected function errorResponse($message, $code)
  {
    return response()->json(['error' => $message, 'code' => $code], $code);
  }

  protected function showAll(Collection $collection, $code = 200)
  {
    if ($collection->isEmpty()) {
      return $this->successResponse(['data' => $collection], $code);
    }
    return $this->successResponse($collection, $code);
  }

  protected function showOne(Model $instance, $code = 200)
  {
    return $this->successResponse($instance, $code);
  }

  protected function showMessage($message, $code = 200)
  {
    return $this->successResponse(['data' => $message], $code);
  }

  protected function sortData(Collection $collection, $transformer)
  {
    if (request()->has('sort_by')) {
      $attr = $transformer::originalAttribute(request()->sort_by);

      $collection = $collection->sortBy($attr);
    }
    return $collection;
  }
}
