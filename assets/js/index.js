$("#add_user").submit(function(event){
    alert("Data inserted successfully");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url": `https://cooperative-dress-lion.cyclic.app/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully");
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url": `https://cooperative-dress-lion.cyclic.app/${id}`,
            "method": "DELETE"
        }

        if(confirm("Do you want to delete this user?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully");
                location.reload()
            })
        }
    })
}