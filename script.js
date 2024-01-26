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
//function itemQuery(e){
//$("#itemType").on('change', function(e) {
//$(document).on('change','#itemType',function(e){
$(document).on('change', '#itemType', function() {
  //itemtype=$("#itemType").val();
  //document.getElementById('itemType').nextElementSibling.innerHTML;
  
  //let nextSibling = div.val();     
  console.log('div:'+document.getElementById('itemType').nextElementSibling.innerHTML);

  //$(this).parent('td').attr('data-id');
  //document.getElementById('itemType').nextSibling;
  //itemtype=$(this).val();
  $.ajax({
    type: "POST",
    url: "index.php",
    data: {
    'opc': 6,
    'itemType': $(this).val()
    },
    dataType: "html",
    success: function(data){
      //$(this).parent()
      //$(this).parent().next('.itemType').show('asdad');
      //$(this).next('#add-itemType').show('asdad');
      
      $('#xx').html(data);
      //let divx=document.getElementById('itemType').parent().nextElementSibling;
      //divx.html(data);
      //document.getElementById('itemType').nextElementSibling.html(data);
      //$(nextSibling).html(data);
      //$(this).html(data);
    }
  });
});
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
    let klon = newRow.prop('id', 'xx' );
});
$(document).on('click','#remove',function(){
  let removeRow=$(this).parents("tr").remove();
});



