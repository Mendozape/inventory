$(document).ready(function() {
  new DataTable('#example');
});

function allAreEqual(array) {
  const result = array.every(element => {
    if (element === array[0]) {
      return true;
    }
  });
  return result;
}

$(document).on('click','#showData',function(e){
    $.ajax({
      type: "GET",
      url: "index.php",
      data: {
        'opc': 2
      },
      dataType: "html",
      success: function(data){
        $('#table-edit').hide();
        $('#message').hide();
        $('#table-add').show();
        $('#table-add').html(data);
        $('#add_form').submit(function (e) {
          e.preventDefault();
          var form = $(this);
          var formData = form.serialize();
          var isValid = true;
          var isValid2 = true;
          // Check if form is valid
          if (!form[0].checkValidity()) {
            e.stopPropagation();
            isValid = false;
          }
          form.addClass('was-validated');
          var selectElements = document.getElementsByName("itemType");
          var firstItemType = selectElements[0].value;
          for (var i = 1; i < selectElements.length; i++) {
              if (selectElements[i].value !== firstItemType) {
                isValid2 = false;
              }
          }
          if (isValid) {
            // Perform AJAX request
            if (isValid2) {
              $.ajax({
                url: "index.php",
                type: "POST",
                data:$('#add_form').serialize() + '&opc=' + 3,
                dataType: "html",
                success: function(data){
                  //let array1= $('#item');
                  //array1.forEach((element) => console.log(element));
                  //console.log($('#item'));
                  $('#error').hide();
                  $('#table-add').hide();
                  $('#message').show();
                  $('#message').html(`<div class=" alert alert-success text-center" role="alert">${data}</div>`);
                }
              });
            }else{
              $('#error').html(`<div class="bg-danger text-white text-center" role="alert">The Item Type must be the same in all rows, if you want different you have to make separete requests.</div>`);
            }
          }
        });
      }
    });
  });


///////////////Edit request
$(document).on('click','#editData',function(){
  let req_id=$(this).parent('td').attr('data-id');
  $.ajax({
    type: "GET",
    url: "index.php",
    data: {
      'opc': 4,
      'req_id': req_id
    },
    dataType: "html",
    success: function(data){
      $('#table-add').hide();
      $('#message').hide();
      $('#table-edit').show();
      $('#table-edit').html(data);
      $('#edit_form').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var formData = form.serialize();
        var isValid = true;
        var isValid2 = true;
        // Check if form is valid
        if (!form[0].checkValidity()) {
          e.stopPropagation();
          isValid = false;
        }
        form.addClass('was-validated');
        var selectElements = document.getElementsByName("itemType");
        var firstItemType = selectElements[0].value;
        for (var i = 1; i < selectElements.length; i++) {
          if (selectElements[i].value !== firstItemType) {
            isValid2 = false;
          }
        }
        if (isValid) {
          // Perform AJAX request
          if (isValid2) {
            $.ajax({
              url: "index.php",
              type: "POST",
              data:$('#edit_form').serialize() + '&opc=' + 5,
              dataType: "html",
              success: function(data){
                $('#error').hide();
                $('#table-edit').hide();
                $('#message').show();
                $('#message').html(`<div class="alert alert-success text-center" role="alert">${data}</div>`);
                /*$.ajax({
                  type: "GET",
                  url: "index.php",
                  data: {
                    'opc': 1
                  },
                  dataType: "html",
                  success: function(data){
                    $('#container').show();
                    $('#container').html(data);
                  }
                });*/
              }
            });
          }else{
            $('#error').html(`<div class="bg-danger text-white text-center" role="alert">The Item Type must be the same in all rows, if you want different you have to make separete requests.</div>`);
          }
        }
      });
    }
  });
});

//get data on change Item Type
$(document).on('change', '#itemType', function(e) {
  $.ajax({
    type: "POST",
    url: "index.php",
    data: {
    'opc': 6,
    'itemType': $(this).val()
    },
    dataType: "html",
    success: function(data){
      //get div next to the itemType
      $(e.currentTarget.parentElement.nextElementSibling).html(data);
    }
  });
});

//clone de div
$(document).on('click','#addMore',function(){
    let newRow=$(this).parent().parent().clone().insertAfter($(this).parent().parent());
});

$(document).on('click','#remove',function(){
  let removeRow=$(this).parent().parent().remove();
  });


