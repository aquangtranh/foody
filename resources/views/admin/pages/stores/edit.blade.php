@extends('admin.layout.master')
@section('title',__('store.admin.edit.title') )
@section('body')
<!-- Hover Rows -->
<div class="row clearfix">
  @include('admin.includes.message')
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="card">
      <div class="body">
        <h2 class="card-inside-title">{{ __('store.admin.edit.title') }}</h2>
        <div class="row clearfix">
          <div class="col-sm-12">
            <form id="demo-form2" method="POST" action="{{ route('admin.stores.update', $store->id) }}" enctype="multipart/form-data">
              @csrf
              @method('PUT')
              <div class="form-group">
                <label for="name">{{ __('store.admin.name') }}</label>
                <div class="form-line">
                <input type="text" name="name" class="form-control" value="{{ old('name', $store->name) }}" placeholder="{{ __('store.admin.add.enter_name') }}" />
                </div>
              </div>
              @if (Auth::user()->role_id == 1)
              <div class="form-group">
                <label class="control-label">{{ __('store.admin.manager') }}</label>
                <select name="manager_id" class="form-control">
                  @foreach ($managers as $id => $name)
                    <option {{ $id == $store->manager_id ? 'selected' : '' }} value="{{ $id }}">{{ old('name', $name) }}</option>
                  @endforeach
                </select>
              </div>
              @else
                <input type="hidden" name="manager_id" value="{{Auth::user()->id}}">
              @endif
              <div class="form-group">
                <label class="control-label">{{ __('store.admin.manager') }}</label>
                <select name="manager_id" class="form-control">
                  @foreach ($managers as $id => $name)
                    <option {{ $id == $store->manager_id ? 'selected' : '' }} value="{{ $id }}">{{ old('name', $name) }}</option>
                  @endforeach
                </select>
              </div>
              <div class="form-group">
                <label for="address">{{ __('store.admin.address') }}</label>
                <div class="form-line">
                  <input type="text" name="address" class="form-control" value="{{ old('name', $store->address) }}" placeholder="{{ __('store.admin.add.enter_address') }}" />
                </div>
              </div>
              <div class="form-group">
                <label for="phone">{{ __('store.admin.phone') }}</label>
                <div class="input-group">
                  <input type="text" name="phone" class="form-control" value="{{ old('phone', $store->phone) }}" placeholder="{{ __('store.admin.add.enter_phone') }}"/>
                </div>
              </div>
              <div class="form-group">
                <label for="describe">{{ __('store.admin.describe') }}</label>
                <div class="form-line">
                  <textarea name="describe" rows="4" class="form-control no-resize" placeholder="{{ __('store.admin.add.enter_describe') }}">{{ old('describe', $store->describe) }}</textarea>
                </div>
              </div>
              <div class="form-group">
                <label for="image">{{ __('store.admin.image') }}</label>
                <div class="form-line row clearfix">
                  <div class="col-sm-6">
                    <input type="file" name="image" class="form-control" placeholder="{{ __('store.admin.create.enter_image') }}" />
                  </div>
                  <div class="col-sm-6">
                    <img class="img-responsive thumbnail" src="images/stores/{{ $store->image }}">
                  </div>
								</div>								
              </div>
              <div class="form-group row clearfix">
                <div class="col-sm-4">
                  <b>{{ __('store.admin.edit.time_open') }}</b>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="material-icons">access_time</i>
                    </span>
                    <div class="form-line">
                      <input name="time_open" type="text" class="form-control time24" value="{{ old('time_open', $store->shopOpenStatus->time_open) }}" placeholder="Ex: 23:59">
                    </div>
                  </div>
                </div>
                <div class="col-sm-4">
                  <b>{{ __('store.admin.edit.time_close') }}</b>
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="material-icons">access_time</i>
                    </span>
                    <div class="form-line">
                      <input name="time_close" type="text" class="form-control time24" value="{{ old('time_close', $store->shopOpenStatus->time_close) }}" placeholder="Ex: 23:59">
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" id="submit" name="submit" class="btn btn-success">{{ __('store.admin.edit.update') }}</button>&nbsp;
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- #END# Hover Rows -->
@endsection
