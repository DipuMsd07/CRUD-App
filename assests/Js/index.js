
$("#add_user").submit(()=>{
    alert("Data Inserted Successfully");
})

$("#update_user").submit(function(event){
    event.preventDefault();
    var newArray = $(this).serializeArray();
    var data = {};

    $.map(newArray,function(n){
        data[n['name']] = n['value']
    })

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!!!");
    })
}) 


if(window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm("Do You Really Want to delete this Record???"))
        {
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!!!");
                location.reload();
            })
        }
    })
}