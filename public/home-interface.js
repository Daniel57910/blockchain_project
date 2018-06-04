console.log("hello");
 $(document).ready(function () {
   console.log("PAGE LOADING");
  $("#doctor_sign_in").click(function() {
    window.location.href = '/sign-in-doctor';
    console.log("sign in doctor");
  });

});