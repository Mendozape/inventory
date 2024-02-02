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
        //$(this).addClass("test");
        
        //$('#example2').removeClass('table');
        //$('#example2').removeClass("test");
        //document.removeAttribute('style');
        $('#table-edit').hide();
        $('#message').hide();
        $('#table-add').show();
        $('#table-add').html(data);
        //set id to the div based on rows number
        //let table = document.getElementById('example2');
        //let totalRowCount = table.rows.length;
        const InvRows = document.getElementById('InvRows').childElementCount;
        //const InvRows = document.getElementById('InvRows').childElementCount;
        //console.log('adsad'+InvRows);
        let div=document.getElementById('itemType').nextElementSibling;
        let divParent=document.getElementById('itemType').parentElement.parentElement;
        div.setAttribute('id','div'+InvRows);
        divParent.setAttribute('id','divParent'+InvRows);
        
        document.getElementById('add_form').addEventListener('submit', function (event) {
          if (!this.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          }else{
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
          this.classList.add('was-validated');
      });
      
        /*table.classList.add('table');
        table.classList.add('table-success');
        table.classList.add('table-striped');*/
        

        //console.log(table);
        //alert('asd');
        //console.log(document.getElementById('div4'));
        //$("#add_form").validate({
          //submitHandler: function() {
           //table.removeAttribute('bgcolor','red');
           
        /*table.classList.remove('table');
        table.classList.remove('table-success');
        table.classList.remove('table-striped');*/
        /*$("tr").each(function() {
          this.setAttribute("style", "background-color:red;");
        });*/
             
            /*let count = 0;
            $("select").each(function() {
                if(this.value === ''){
                    count++
                    let f=this.parentElement.parentElement;
                    f.setAttribute("style", "background-color:red;");
                    //f.style.backgroundColor='red';
                    //document.getElementById('tr4').style.backgroundColor='red';
                    
                }
            });
            if (count > 0) {
              $('#error').html(`<div class="alert alert-success text-center" role="alert">Falta llenar algun campo</div>`);
              return false;
            }else{
              
            }*/
            //console.log(a);
            /*$.ajax({
              url: "index.php",
              type: "POST",
              data:$('#add_form').serialize() + '&opc=' + 3,
              dataType: "html",
              success: function(data){
                $('#table-add').hide();
                $('#message').show();
                $('#message').html(`<div class="alert alert-success text-center" role="alert">${data}</div>`);
                
              }
            });*/
            
          //}
        //});
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
      //let f=e.currentTarget.parentElement.parentElement.setAttribute("style", "background-color:white;");
      $(e.currentTarget.nextElementSibling).html(data);
    }
  });
});
$(document).on('change', '#item', function(e) {
    let ff=e.currentTarget.parentElement.parentElement.setAttribute("style", "background-color:white;")
});
$(document).on('change', '#user', function(e) {
  let ff=e.currentTarget.parentElement.parentElement.setAttribute("style", "background-color:white;")
});

//clone de tr
$(document).on('click','#addMore',function(){
  //let cuerpo=document.getElementById('cuerpo').childElementCount;
  //let newRow=$(this).parents("div").clone().insertAfter($(this).parents("div"));
  let newRow=$(this).parent().parent().clone().insertAfter($(this).parent());
  //let table = document.getElementById('example2');
  const totalDivCount = document.getElementById('InvRows').childElementCount;
  
  //let totalRowCount = table.rows.length;
  newRow.prop('id', 'divParent'+totalDivCount );
  //let a= document.getElementById('xx').getElementsByTagName('div').innerHTML='lato';
  let a= document.getElementById('divParent'+totalDivCount).children[0].children[2];
  a.setAttribute('id','div'+totalDivCount);
  //a.setAttribute('class','row');
});

$(document).on('click','#remove',function(){
  let removeRow=$(this).parents("tr").remove();
  });


