$(function(){
    var asPane = $('.ajaxsearch-pane');
    
    //on keyup event of textbox
    $('.ajaxsearch-input').on('keyup',function(e){
        //check keys if(escape,up,down)
        if(e.which==27){//escape key
            $('.ajaxsearch-pane').hide();
            return false;
        }else if(e.which==38){//up key
            $('.ajaxsearch-pane a:last-child').focus();
            return false;
        }else if(e.which==40){//down key
            $('.ajaxsearch-pane a:first-child').focus();
            return false;
        }
        
        //get value of textbox
        var term = $(this).val().trim();
        
        //if there is some text means not empty
        if(term.length > 0){
            $.ajax({
                url:'fetch_items.php',
                type:'POST',
                data:{term:term},
                beforeSend:function(){
                    asPane.show().html('<p text-center>Processing...</p>');
                },
                success:function(response){
                    //convert json
                    var records = JSON.parse(response);
                    
                    //if more than zero records returned
                    if(records.length>0){
                        asPane.html('');
                        asPane.show();
                        $.each(records,function(i,rec){
                            var option = '<a href="#" class="ajaxsearch-item" data-id="'+rec.id+'">'+
                                    '<span class="as_id">'+rec.id+'</span>'+
                                    '<span class="as_color">'+rec.color+'</span>'+
                                    '<span class="as_Size">'+rec.sex+'</span>'+
                                    '<span class="as_Sex">'+rec.sex+'</span>'+
                                    '<span class="as_Supplier">'+rec.supplier_name+'</span>'+
                                    '<span class="as_cost">'+rec.cost+'</span>'+
                                    '<span class="as_type">'+rec.type+'</span>'+
                                    '<span class="as_type2">'+rec.type2+'</span>'+
                                '</a>';
                            asPane.append(option);
                        });//loop throught all records
                    }else{
                        asPane.hide();
                    }
                },//success
                error:function(a,b){
                    asPane.show().html('<p text-center>Ops! Please check your internet connection</p>');
                }//error
            });//end ajax()
        }else{
            asPane.hide();
        }//if not empty text
    });//end ajaxsearch-input change
    
    //click on an option
    $('body').on('click','.ajaxsearch-item',function(e){
        e.preventDefault();
        var id = $(this).attr('data-id');        
        $('.ajaxsearch-hidden-input').val(id);
        var txt = [];
        $(this).find('span').each(function(i,v){
            txt.push($(this).text());
        });        
        $('.ajaxsearch-input').val(txt.join(' '));        
        $('.ajaxsearch-pane').hide();
        return false;
    });
   
    //up down and enter key on options
    $('body').on('keyup','.ajaxsearch-pane a',function(e){
        if(e.which==38){//up key
                $('.ajaxsearch-pane a').eq($(this).index()-1).focus();
        }else if(e.which==40){//down key
            $('.ajaxsearch-pane a').eq($(this).index()+1).focus();
        }else if(e.which==13){//enter
            $(this).trigger('click');
        }
        return false;
    });
    
});//end jquery