$(document).ready(function() {
  new DataTable('#example');
});

$(document).on('click','#showData',function(e){
//$(document).ready(function() {
  //$('#showData').click(function() {
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
//});

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


//clone de tr
$(document).on('click','#addMore',function(){
//$(document).ready(function() {
  //$('#addMore').click(function() {
    //alert('sdfdsf');
    //let newRow=$(this).parent().parent().clone().insertAfter($(this).parent());
    $('#a').prepend(`
    <div class='row border' id='a'>
                    <div class='col-md-4 border'>
                        <label for='itemType'>itemType:</label>
                        <select class='form-control mb-2' id='itemType' name='itemType' required>
                            <option value=''>Select Item</option>";
                            //show items
                            $query = mysqli_query($conn, "SELECT * from item_type");
                            $row = mysqli_fetch_all($query, MYSQLI_ASSOC);
                            foreach ($row as $data) {
                                echo "<option value='" . $data['id'] . "'>" . $data['type'] . "</option>";
                            }
                            mysqli_free_result($query);
                            echo "
                        </select>
                        <div class='invalid-feedback'>
                            Please select an item type.
                        </div>
                    </div>
                    <div class='col-md-4 border position-relative'></div>
                    <div class='col-md-4  border position-relative'>
                        <button id='addMore' type='button' class='btn btn-secondary position-absolute bottom-0 start-0 ml-3 mb-2'>Add More</button>
                    </div>
                </div>
    `);
  });
//});

$(document).on('click','#remove',function(){
  let removeRow=$(this).parents("tr").remove();
  });


