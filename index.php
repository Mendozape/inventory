<?php
// Create connection
$conn = mysqli_connect("localhost", "root", "xyz*1234", "inventory");
// Check connection
if (!$conn) {
    die("Unable to Connect database: " . mysqli_connect_error());
}
//stwich opcion
if (isset($_GET['opc'])) {
    if ($_GET['opc'] == "1") { ui();}
    if ($_GET['opc'] == "2") { queryAdd();}
    if ($_GET['opc'] == "4") { queryEdit();}
}
if (isset($_POST['opc'])) {
    if ($_POST['opc'] == "3") { saveRequest();}
    if ($_POST['opc'] == "5") { editRequest();}
}
// Principal User Interface
function ui()
{
    global $conn;
?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
        <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
        <script src="script.js"></script>
        <title>Mini Inventory</title>
    </head>
    <body class="bg-secondary">
        <div id="container" class="container">
            <div class="row my-4">
                <div class="col-lg-10 mx-auto">
                    <div class="card shadow">
                        <div class="card-header">
                            <button id="showData" type="button" class="btn btn-primary">Add Request</button>
                        </div>
                        <div id="message"></div>
                        <div id="table-container" class="card-body p-4">
                            <table id="example" class="table table-striped table-hover" style="width:100%">
                            <thead>
                                    <tr>
                                    <th>User</th>
                                    <th>Requested Items</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                    </tr>
                            </thead>
                            <tbody>
                            <?php
                                // Query for show request in db
                                $exec = mysqli_query($conn, "SELECT * from requests");
                                $row = mysqli_fetch_all($exec, MYSQLI_ASSOC);
                                if ($row) {
                                foreach ($row as $data) {
                                    $req_id=$data['req_id'];
                                echo "
                                    <tr >
                                        <td>" . $data['requested_by'] . "</td>
                                        <td>";
                                        $itemsName='';
                                        //convert string to array and be able to use foreach in requests
                                        $array = explode(',', $data['items']);
                                        foreach ($array as $key => $value) {
                                            //inner join  to show the name of request instead of showing id's
                                            $query = "SELECT items.item,items.id,items.item_type, item_type.id,item_type.type from items INNER JOIN item_type ON items.item_type=item_type.id where items.id='$value'";
                                            $result = $conn->query($query);
                                            $row2 = $result->fetch_array(MYSQLI_ASSOC);

                                            $itemsName.=$row2['item'].',';
                                            $itemsType=$row2['type'];
                                        }
                                        //remove the last comma in the string
                                        $itemsName=substr($itemsName, 0, -1);
                                        echo "$itemsName</td>
                                        <td>$itemsType</td>
                                        <td data-id=$req_id><button id='editData' type='button' class='btn btn-secondary' >Edit</button></td>
                                    </tr>";
                                }
                                } else {
                                    echo "
                                    <tr>
                                        <td colspan='7'>No Data Found</td>
                                    </tr>";
                                }
                                mysqli_free_result($exec);
                                //mysqli_free_result($query);
                                 echo "
                            </tbody>
                            </table>";
                            ?>
                        </div>
                        <div id="table-add"></div>
                        <div id="table-edit"></div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
<?php
}
//interface for add request
function queryAdd()
{
    global $conn;
    echo "
    <form action='' method=POST id='add_form'  >
        <table id='example2'   border='1' style='width:100%' class='table table-success table-striped'>
                <thead>
                    <tr>
                        <td colspan='3' align='center' class='bg-secondary'><h3>Add Request</h3></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align='right'>User:</td>
                        <td colspan='2'>
                        <select id='user' name='user' required>
                            <option value=''>Select</option>";
                            //show users
                            $exec = mysqli_query($conn, $query = "SELECT * from users");
                            $row = mysqli_fetch_all($exec, MYSQLI_ASSOC);
                            foreach ($row as $data) {
                                echo "<option value='". $data['user'] ."'>".$data['user'] . "</option>";
                            }
                            echo "
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td align='right'>Requested Items:</td>
                        <td>
                            <select name='item[]' required>
                            <option value=''>Select</option>";
                            //show items
                            $exec = mysqli_query($conn, "SELECT * from items");
                            $row = mysqli_fetch_all($exec, MYSQLI_ASSOC);
                            foreach ($row as $data) {
                            echo "<option value='".$data['id']."'>".$data['item']."</option>";
                            }
                            mysqli_free_result($exec);
                            echo "
                            </select>
                        </td>
                        <td align='left'>
                            <button id='addMore' type='button' class='btn btn-secondary'>Add more</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan='3' class='text-center'>
                            <input type='submit'  value='Save' class='btn btn-primary w-25'  id='save'>
                        </td>
                    </tr>
                </tfoot>
        </table>
    </form>";
}
//interface for edit request
function queryEdit()
{
    global $conn;
    //fetch the request to edit
    $query = "SELECT * from requests  where req_id='$_GET[req_id]'";
    $result = $conn->query($query);
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $requested_by=$row['requested_by'];
    $items=explode(",", $row['items']);
    echo "
    <form action='' method='POST' id='edit_form'  >
        <table id='example2'   border='1' style='width:100%' class='table table-success table-striped'>
                <thead class='thead-dark'>
                    <tr>
                        <td colspan='3' align='center' class='bg-secondary'><h3>Edit Request</h3>
                        <input name='req_id' type='text' hidden value='$_GET[req_id]'>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align='right'>User:</td>
                        <td colspan='2'>
                        <select id='user' name='user' required>
                            <option value=''>Select</option>";
                            //show users and select when is equal to db
                            $query = mysqli_query($conn, $query = "SELECT * from users");
                            $row = mysqli_fetch_all($query, MYSQLI_ASSOC);
                            foreach ($row as $data) {
                                echo "<option value='". $data['user'] ."'"; if($data['user']==$requested_by){ echo "selected";  } echo">" . $data['id'] . '.-' . $data['user'] ."</option>";
                            }
                        echo "
                        </select>
                        </td>
                    </tr>";
                    foreach ($items as $dataItems) {
                        echo"<tr>
                            <td align='right'>Requested Items:</td>
                            <td>
                                <select name='item[]' required>
                                <option value=''>Select</option>";
                                 //show requested items and select when is equal to db
                                $query = mysqli_query($conn, "SELECT * from items");
                                $row2 = mysqli_fetch_all($query, MYSQLI_ASSOC);
                                foreach ($row2 as $data2) {
                                    echo "<option value='". $data2['id'] ."'"; if($data2['id']==$dataItems){ echo "selected";  } echo">".$data2['item']."</option>";
                                }
                                //mysqli_free_result($result);
                                echo"
                                </select>
                            </td>
                            <td align='left'>
                                <button id='addMore' type='button' class='btn btn-secondary'>Add more</button>
                                <button id='remove' type='button' class='btn btn-danger'>Remove</button>
                            </td>
                        </tr>";
                    }
                    mysqli_free_result($query);
                echo"
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan='3' class='text-center'>
                            <input type='submit'  value='Save' class='btn btn-primary w-25'  id='save'>
                        </td>
                    </tr>
                </tfoot>
        </table>
    </form>";
}
//Save request
function saveRequest()
{
    global $conn;
    $today = date("Y-m-d");
    //Convert array to string
    $items = implode(',', $_POST['item']);
    $result = mysqli_query($conn, "INSERT INTO requests (requested_by, requested_on, items)   VALUES ('$_POST[user]','$today','$items')");
    ///////////////////////////////////////check if exist user exist in db////////////////////////////////////////////////
    $query = "SELECT * from summary  where requested_by='$_POST[user]'";
    $result = $conn->query($query);
    $row2 = $result->fetch_array(MYSQLI_ASSOC);
    //if user exist in db decode the items JSON field
    if(isset($row2['items'])){
        $items2=$row2['items'];
        $jsonDecode=json_decode($items2, true);
    }
    //four arrays declaration because there are three type of items plus one multidimentional array to store all three arrays and then create a JSON objet
    $array1= array();
    $array2= array();
    $array3= array();
    $arrays= array();
    if(isset($row2['requested_by'])){
        //split the JSON objet in three arrays
        $array1= $jsonDecode[0];
        $array2= $jsonDecode[1];
        $array3= $jsonDecode[2];
        //iterate the item array
        foreach ($_POST['item'] as $item) {
            $query = "SELECT * from items where id='$item'";
            $result = $conn->query($query);
            $row = $result->fetch_array(MYSQLI_ASSOC);
            $item_type=$row['item_type'];
            //add the item in each array that correspond
            if($item_type==1){
                array_push($array1,$item);
            }
            if($item_type==2){
                array_push($array2,$item);
            }
            if($item_type==3){
                array_push($array3,$item);
            }
        }
        //create the JSON objet and then the UPDATE
        array_push($arrays,$array1);
        array_push($arrays,$array2);
        array_push($arrays,$array3);
        $json=json_encode($arrays, JSON_FORCE_OBJECT);
        $result = mysqli_query($conn, "UPDATE summary SET items='$json' WHERE requested_by='$_POST[user]'");
    }else{
        foreach ($_POST['item'] as $item) {
            $query = "SELECT * from items where id='$item'";
            $result = $conn->query($query);
            $row = $result->fetch_array(MYSQLI_ASSOC);
            $item_type=$row['item_type'];
            if($item_type==1){
                array_push($array1,$item);
            }
            if($item_type==2){
                array_push($array2,$item);
            }
            if($item_type==3){
                array_push($array3,$item);
            }
        }
        array_push($arrays,$array1);
        array_push($arrays,$array2);
        array_push($arrays,$array3);
        $json=json_encode($arrays, JSON_FORCE_OBJECT);
        $result = mysqli_query($conn, "INSERT INTO summary (requested_by,items)   VALUES ('$_POST[user]','$json')");
    }
    if ($result) echo 'Items updated succesfully';
}
//Edit request
function editRequest()
{
    global $conn;
    /////////////////////////////////////////////////////UPDATE requests///////////////////////////////////
    $today = date("Y-m-d");
    //Convert array to string
    $items = implode(',', $_POST['item']);
    $query = mysqli_query($conn, "UPDATE requests SET items='$items',requested_by='$_POST[user]',requested_on='$today' WHERE req_id='$_POST[req_id]'");
    //show succesfully message in the UI
    if ($query) echo 'Items updated succesfully';
    ////////////////////////////////////////////////////UPDATE summary/////////////////////////////////////
    ///////////////////////////////////////check if exist user exist in db////////////////////////////////////////////////
    $query = "SELECT * from summary  where requested_by='$_POST[user]'";
    $result = $conn->query($query);
    $row2 = $result->fetch_array(MYSQLI_ASSOC);
    //if user exist in db decode the items JSON field
    $items2=$row2['items'];
    $jsonDecode=json_decode($items2, true);
    //four arrays declaration because there are three type of items plus one multidimentional array to store all three arrays and then create a JSON objet
    $array1= array();
    $array2= array();
    $array3= array();
    $arrays= array();
    //split the JSON objet in three arrays
    $array1= $jsonDecode[0];
    $array2= $jsonDecode[1];
    $array3= $jsonDecode[2];
    //iterate the item array
    foreach ($_POST['item'] as $item) {
        $query = "SELECT * from items where id='$item'";
        $result = $conn->query($query);
        $row = $result->fetch_array(MYSQLI_ASSOC);
        $item_type=$row['item_type'];
        //add the item in each array that correspond
        if($item_type==1){
            array_push($array1,$item);
        }
        if($item_type==2){
            array_push($array2,$item);
        }
        if($item_type==3){
            array_push($array3,$item);
        }
    }
    //create the JSON objet and then the UPDATE
    array_push($arrays,$array1);
    array_push($arrays,$array2);
    array_push($arrays,$array3);
    $json=json_encode($arrays, JSON_FORCE_OBJECT);
    $result = mysqli_query($conn, "UPDATE summary SET items='$json' WHERE requested_by='$_POST[user]'");
}
?>