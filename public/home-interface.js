 $(document).ready(function () {
  $("#doctor_sign_in").click(function() {
    window.location.href = '/doctor/sign_in';
  });
 $("#doctor_sign_up").click(function() {
   window.location.href = '/doctor/new_registration';
 });

 $("#patient_sign_in").click(function() {
   window.location.href = '/sign-in-patient';
 });
$("#patient_sign_up").click(function() {
  window.location.href = '/sign-up-patient';
});

$("#pharmacist_sign_in").click(function() {
  window.location.href = '/sign-in-pharmacist';
});
$("#pharmacist_sign_up").click(function() {
 window.location.href = '/sign-up-pharmacist';
});
});
