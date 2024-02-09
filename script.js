$(document).ready(function() {
  new DataTable('#example');
});

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
          // Check if form is valid
          if (!form[0].checkValidity()) {
            e.stopPropagation();
            isValid = false;
          }
          form.addClass('was-validated');
          if (isValid) {
            // Perform AJAX request
            $.ajax({
              url: "index.php",
              type: "POST",
              data:$('#add_form').serialize() + '&opc=' + 3,
              dataType: "html",
              success: function(data){
                $('#table-add').hide();
                $('#message').show();
                $('#message').html(`<div class="alert alert-success text-center" role="alert">${data}</div>`);
              }
            });
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
        // Check if form is valid
        if (!form[0].checkValidity()) {
          e.stopPropagation();
          isValid = false;
        }
        form.addClass('was-validated');
        if (isValid) {
          // Perform AJAX request
          $.ajax({
            url: "index.php",
            type: "POST",
            data:$('#edit_form').serialize() + '&opc=' + 5,
            dataType: "html",
            success: function(data){
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


