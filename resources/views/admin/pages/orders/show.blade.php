@extends('admin.layout.master')
@section('title', __('order.admin.detail_title'))
@section('body')
<div class="row clearfix">
	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<div class="card">
			<div class="header">
				<h2>
					<i class="material-icons">add</i>{{__('order.admin.show.title')}}
				</h2>
			</div>
			<div class="body">
				<form id="form_advanced_validation">
					<div class="form-group">
            <b>{{__('user.admin.username')}}</b>
						<div class="form-line">
							<input type="text" class="form-control" disabled="disabled"
								value="{{ $order->user->username }}">
						</div>
					</div>
					<div class="form-group">
            <b>{{__('user.admin.fullname')}}</b>
						<div class="form-line">
							<input type="text" class="form-control" disabled="disabled"
								value="{{ $order->user->full_name }}">
						</div>
					</div>
					<div class="form-group">
            <b>{{__('order.admin.address')}}</b>
						<div class="form-line">
							<input type="text" class="form-control" disabled="disabled"
								value="{{ $order->address }}">
						</div>
					</div>
					<div class="form-group">
            <b>{{__('user.admin.phone')}}</b>
						<div class="form-line">
							<input type="text" class="form-control" disabled="disabled"
								value="{{ $order->user->phone }}">
						</div>
					</div>
					<div class="form-group">
            <b>{{__('user.admin.email')}}</b>
						<div class="form-line">
							<input type="text" class="form-control" disabled="disabled"
								value="{{ $order->user->email }}">
						</div>
					</div>
					<div class="form-group">
            <b>{{__('order.admin.money_ship')}}</b>
						<div class="form-line">
							<input type="text" class="form-control" disabled="disabled"
                value="{{ $order->money_ship }}"> 
						</div>
					</div>
					<div class="form-group row clearfix">
						<div class="col-sm-4">
						  <b>{{__('order.admin.submit_time')}}</b>
						  <div class="input-group">
							<span class="input-group-addon">
								<i class="material-icons">access_time</i>
							</span>
							<div class="form-line">
								<input name="time_open" type="text" value="{{ $order->submit_time }}" class="form-control time24">
							</div>
						  </div>
						</div>
						<div class="col-sm-4">
						  <b>{{__('order.admin.delivery_time')}}</b>
						  <div class="input-group">
							<span class="input-group-addon">
								<i class="material-icons">access_time</i>
							</span>
							<div class="form-line">
								<input name="time_close" type="text"  value="{{ $order->delivery_time }}" class="form-control time24">
							</div>
						  </div>
						</div>
					  </div>
					<div class="form-group">
            <b>{{__('order.admin.customer_note')}}</b>
						<div class="form-line">
                <input type="text" class="form-control" disabled="disabled"
                value="{{ $order->customer_note }}">
						</div>
					</div>

					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div class="card">
							<div class="header">
								<h2>
                    {{__('order.admin.show.list_products')}}
								</h2>
							</div>
							<div class="body table-responsive">
								<table class="table table-striped">
									<thead>
										<tr>
											<th>{{__('product.admin.show.name')}}</th>
											<th>{{__('product.admin.show.price')}}</th>
											<th>{{__('detail_order.admin.quantity')}}</th>
											<th>{{__('order.admin.total')}}</th>
										</tr>
									</thead>
									<tbody>
									@foreach ($detailOrders as $detailOrder)
										<tr>
											<th scope="row"><a href="{{ route('admin.products.show', $detailOrder->product->id)}}">{{$detailOrder->product->name }}</a></th>
											<td>{{$detailOrder->product->price }}</td>
											<td>{{$detailOrder->quantity}}</td>
											<th scope="row">{{ count($detailOrders)}}</th>
										</tr>
									@endforeach
									</tbody>
								</table>
							</div>
							<div class="align-right">
								<h3 style="margin-right: 126px; padding-bottom: 25px;">
									Thành tiền: ${total} VND</h3>
							</div>
						</div>
					</div>
					<button class="btn btn-success waves-effect" type="submit">SỬA</button>
				</form>
			</div>
		</div>
	</div>
</div>
@endsection
