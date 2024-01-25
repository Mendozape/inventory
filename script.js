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
        $("#add_form").validate({
          submitHandler: function() {
            $.ajax({
              url: "index.php",
              type: "POST",
              data:$('#add_form').serialize() + '&opc=' + 3,
              dataType: "html",
              success: function(data){
                $('#table-add').hide();
                $('#message').show();
                $('#message').html(`<div class="alert alert-success text-center" role="alert">${data}</div>`);
                $.ajax({
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
                });
              }
            });
          }
        });
      }
    });
});
$(document).on('click','#editData',function(e){
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
      $("#edit_form").validate({
        submitHandler: function() {
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
//clone de tr
$(document).on('click','#addMore',function(){
    let newRow=$(this).parents("tr").clone().insertAfter($(this).parents("tr"));
});
$(document).on('click','#remove',function(){
  let removeRow=$(this).parents("tr").remove();
});



