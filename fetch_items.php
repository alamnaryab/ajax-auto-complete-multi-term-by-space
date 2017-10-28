<?php
	/* Database Connection */
    $db_host = "alampkcom.ipagemysql.com";
    $db_user = "alam_test";
    $db_pwd  = "alam_test";
    $db_name = "alam_test";
    $db= new mysqli($db_host,$db_user,$db_pwd,$db_name);
	if($db->connect_error)
	{
		echo "ERROR: (".$db->connect_errno.") ".$db->connect_error;
		exit();
	}
	
	/* Get input parameter from ajax call */
	if(isset($_POST['term'])){
		$term = trim($db->real_escape_string($_POST['term']));
		if(strlen($term)>0){
                        /* seperate by space */
			$terms = explode(' ',$term);
                        
            /* database fields to compare with each of above terms comment those which you do not want to include in where conditions */
			$fields = array(					
				'id',
				'color',
				'size',
				'sex',
				'supplier_id',
				'supplier_name',
				'sku',
				'cost',
				'link',
				'manufacturer',
				'style',
				'type',
				'type2',
				'type3',
				'quantity',
                );
                        
                    /* make where conditions */
                    $whr = array();
                    foreach($terms as $key_terms=>$single_term){                        
                        $whr[] = implode(' like "%'.$single_term.'%" or ',$fields).' like "%'.$single_term.'%"';                         
                    }//end foreach terms
                    $where = '('.implode(') and (',$whr).')';
                    $sql = "select * from rob_stocks where ". $where;
                    
                    $res = $db->query($sql);
                    if($res){
                        $records = array();
                        while($record = $res->fetch_assoc() ){
                            $records[] =$record;
                        }
                        echo json_encode($records);
                    }else{
                        echo $db->error;' Ops! something went wrong, Please write us about this.';
                    }
                    
		}//if term is not empty			
	}//end if post request
        
        //close database connection
        $db->close();
?>