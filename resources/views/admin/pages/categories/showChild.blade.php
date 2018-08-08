@extends('admin.layout.master')
@section('title', __('category.admin.title'))
@section('body')
<div class="row clearfix">
  @include('admin.includes.message')
	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<div class="card">
      <div class="header">
        <h2>{{__('category.admin.title') .": ".$categoriesParent->name}}</h2>
        <a href="{{ route('admin.categories.create') }}"
            class="btn bg-green waves-effect" style="margin-top: 30px;"> <i
            class="material-icons">add</i><span>{{ __('category.admin.add.create') }}</span>
        </a>
      </div>
      <div class="body table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>{{ __('category.admin.table.id') }}</th>
              <th>{{ __('category.admin.table.name') }}</th>
              <th>{{ __('category.admin.table.edit') }}</th>
              <th>{{ __('category.admin.table.delete') }}</th>
            </tr>
          </thead>
          <tbody>
            @foreach ($categoriesChild as $category)
              <tr>
                <th scope="row">{{ $category->id }}</th>
                <td>{{ $category->name }}</td>
                <td><a id="edit-{{$category->id}}"
                    href="{{route('admin.categories.edit', $category->id)}}"
                    class="btn bg-yellow btn-circle waves-effect waves-circle waves-float">
                  <i class="material-icons">border_color</i>
                  </a>
                </td>
                <td>
                  <form class="del-form" action="{{ route('admin.categories.destroy', $category->id)}}" method="post">
                    @csrf
                    @method('DELETE')
                    <button id="delete-{{$category->id}}" class="btn btn-danger btn-circle waves-effect waves-circle waves-float"  onclick="return confirm('@lang('category.admin.message.msg_del')')" type="submit">
                      <i class="material-icons">delete_sweep</i>
                    </button>
                  </form>
                </td>
              </tr>
            @endforeach
          </tbody>
        </table>
        {{ $categoriesChild->links()}}
      </div>
    </div>
	</div>
</div>
@endsection
