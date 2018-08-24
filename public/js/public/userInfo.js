function showUserInfo(response) {
  let user = response.result;
  token = localStorage.getItem('token-login');
  if(token) {
    if (user.gender == 1) {
      $('#genderInfo option[value=1]').attr('selected','selected');
    } else {
      $('#genderInfo option[value=0]').attr('selected','selected');
    }
    $('#textMessage').hide();
    $('#userNameInfo').val(user.username);
    $('#fullNameInfo').val(user.full_name);
    $('#phoneNumberInfo').val(user.phone);
    $('#emailInfo').val(user.email);
  }
}

function editUserInfo() {
  $.ajax({
    url: "/api/users/profile",
    type: "put",
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    data: {
      'full_name' : $('#fullNameInfo').val(),
      'phone'  : $('#phoneNumberInfo').val(),
      'email'  : $('#emailInfo').val(),
      'gender' : $('#genderInfo').val(),
    },
    success: function(response) {
      $('#textMessage').show();
    },
    error: function (response) {
      alert(response.responseJSON.message);
    }
  });
}

$(document).ready(function () {
  token = localStorage.getItem('token-login');
  if(token) {
    $.ajax({
      url: "/api/users/info",
      type: "get",
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      },
      success: function(response) {
        showUserInfo(response);
      }
    });
  
    $(document).on('click', '#btnUpdateInfo', function(event) {
      event.preventDefault();
      editUserInfo();
      $('#textMessage').text('Your profile was updated successfully!');
    });
  } else {
    $('#textMessage').text('You are not sign in or do not have account. Please sign in or sign up account!');
    $('#profileForm').hide();
  } 
});
