site_url = 'grras_org/wp-content/themes/my_theme/index.html';



$(document).ready(function(){

	// results sidebar active menu
	$('#accordion.results li').click(function(){
				
		$('#accordion.results li').removeClass('active');
		$(this).addClass('active');

	})
	
	$('#accordion .panel-title a').click(function(){
		//alert($(this).attr('class'));		
		$('#accordion .panel-title a').removeClass('collapse');
		$(this).addClass('collapse');
		//alert('dada');
	});
	
						   
});

// load results using ajax
function load_results(exam_id)
{
	$.ajax({
		    type : 'POST',
			   url :  site_url+'process.php?action=get_exam_results&exam_id='+exam_id,
			   success : function(response){					
						//$('.result_table').parent().html(response);
						$('.result_table').html(response);
						//$('#forgot_password_email').val('');
						//alert(response);
						
			   }
		   
		   });
}

/*function load_exam_dates(location_id,course_id)
{
	$.ajax({
		    type : 'POST',
			   url :  site_url+'process.php?action=get_exam_dates&location_id='+location_id+'&course_id='+course_id,
			   success : function(response){					
						$('.exam_table').parent().html(response);
						//$('#forgot_password_email').val('');
						//alert(response);
						
			   }
		   
		   });
}*/


function load_exam_dates(location_id)
{
	$.ajax({
		    type : 'POST',
			   url :  site_url+'process.php?action=get_exam_dates&location_id='+location_id,
			   success : function(response){					
						//$('.exam_table').parent().html(response);
						$('.exam_table').html(response);
						//$('#forgot_password_email').val('');
						//alert(response);
						
			   }
		   
		   });
}

function load_testimonials(course_id)
{
	$.ajax({
		    type : 'POST',
			   url :  site_url+'process.php?action=get_testimonials&course_id='+course_id,
			   success : function(response){					
						$('.testimonials_table').parent().html(response);
						//$('#forgot_password_email').val('');
						//alert(response);
						
			   }
		   
		   });
}


function show_student_detail()
{
	$('#student_detail').show();
	$('#employee_details').hide();
}

function show_employee_detail()
{
	$('#student_detail').hide();
	$('#employee_details').show();		
}


function newsletter_signup()
{
	$('#newsletter_msg').html('Your subscription has been sent.');
	$('#newsletter .btn').attr('disabled','disabled');

/*if(confirm('asda'))
	$('#contact_us .btn').attr('disabled',false);
return false;*/

	$.ajax({	   
		   type : 'POST',
		   url : site_url+'process.php?action=newsletter-subscribe',
		   data: $('#newsletter').serialize(),
		   success : function(response){					
					//alert(response);
					$('#newsletter_email').val('');					
					//$('#response_message').text(response);
					$('#newsletter .btn').attr('disabled',false);
					
		   }
		   
	 });
	
	return false;
}




function valid_form(form_id){

	flag = 0;
	
	$('#'+form_id+' :input[type=text].validate').map(function(index,elm){
	
			name = elm.name;
			id = elm.id;
			value = $(elm).val();
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);			
			
			//alert(name+'~~~'+id+'~~~'+value);
			if(value == '')
			{
				
				if(name == 'email')
				{
					if($.inArray('required',classList) == -1)
					{						
						//$('<span id="required">required</span>').insertAfter(elm);
						$(elm).addClass('required');	
					}
					else
					{
						$(elm).next("span").html('required');
					}	
				}
				else
				{
					if($.inArray('required',classList) == -1)
					{						
						//$('<span id="required">required</span>').insertAfter(elm);
						$(elm).addClass('required');	
					}		
				}
				flag = 1;
				
			}
			else if(value != '')
			{
				if(name == 'email')
				{		
					//alert('aaa');							
					var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
					var valid = emailPattern.test(value);
					if (valid == true)
					{
						//$(elm).next("span").remove();
						$(elm).removeClass('required');
					}
					else
					{
						if($.inArray('required',classList) == -1)
						{							
							//$('<span id="required">invalid</span>').insertAfter(elm);							
							$(elm).addClass('required');	
						}
						else
						{
							//$(elm).next("span").html('invalid');
						}
						flag = 1;
						//$(elm).next("span").html('invalid');
					}				
				}
				else
				{
					//$(elm).next("span").remove();
					$(elm).removeClass('required');
				}
			}
	});
	
	$('#'+form_id+' :input[type=file].validate').map(function(index,elm){
	
			name = elm.name;
			id = elm.id;
			value = $(elm).val();
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);			
			
			//alert(name+'~~~'+id+'~~~'+value);
			if(value == '')
			{
				
				if($.inArray('required',classList) == -1)
				{						
					//$('<span id="required">required</span>').insertAfter(elm);
					$(elm).addClass('required');	
				}		
				
				flag = 1;
				
			}
			else if(value != '')
			{				
				//$(elm).next("span").remove();
				$(elm).removeClass('required');
				
			}
	});
	
	$('#'+form_id+' select.validate').map(function(index,elm){
	
			name = elm.name;
			id = elm.id;
			value = $(elm).val();
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);			
			
			//alert(name+'~~~'+id+'~~~'+value);
			if(value == '')
			{
				if($.inArray('required',classList) == -1)
				{
					//$('<span id="required">Required</span>').insertAfter(elm);
					$(elm).addClass('required');	
				}				
				flag = 1;
			}
			else if(value != '')
			{
				//$(elm).next("span").remove();
				$(elm).removeClass('required');
			}
	});	
	
	
	$('#'+form_id+' textarea.validate').map(function(index,elm){
	
			name = elm.name;
			id = elm.id;
			value = $(elm).val();
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);
		
			//alert(name+'~~~'+id+'~~~'+value);
			if(value == '')
			{
				if($.inArray('required',classList) == -1)
				{
					//$('<span id="required">Required</span>').insertAfter(elm);
					$(elm).addClass('required');	
				}				
				flag = 1;
			}
			else if(value != '')
			{
				//$(elm).next("span").remove();
				$(elm).removeClass('required');
			}
	});
		
	
	//alert(flag);
	//return false;
	
	
	if(flag == 1)
		return false;
	else
	{
		/*if(form_id == 'contact_us')
		{
			quick_contact();
			return false;
		}
		if(form_id == 'request_demo_form')
		{
			request_demo_form();
			return false;
		}	*/
		if(form_id == 'newsletter')
		{
			newsletter_signup();
			return false;
		}
		
		if(form_id == 'quick_contact')
		{
			check_captcha(form_id);
			//submit_quick_contact();
			return false;
		}
		else
		{
			if(form_id != 'commentform')
			{
				check_captcha(form_id);
				return false;
				//return true;
			}
		}
		
		//return true;
	
	}
	//	return true
	

}



function valid_testimonial_form(form_id){

	flag = 0;
	
	$('#'+form_id+' :input[type=text].validate').map(function(index,elm){
	
			name = elm.name;
			id = elm.id;
			value = $(elm).val();
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);			
			
			//alert(name+'~~~'+id+'~~~'+value);
			if(value == '')
			{
				
				if(name == 'email')
				{
					if($.inArray('required',classList) == -1)
					{						
						//$('<span id="required">required</span>').insertAfter(elm);
						$(elm).addClass('required');	
					}
					else
					{
						$(elm).next("span").html('required');
					}	
				}
				else
				{
					if($.inArray('required',classList) == -1)
					{						
						//$('<span id="required">required</span>').insertAfter(elm);
						$(elm).addClass('required');	
					}		
				}
				flag = 1;
				
			}
			else if(value != '')
			{
				if(name == 'email')
				{		
					//alert('aaa');							
					var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
					var valid = emailPattern.test(value);
					if (valid == true)
					{
						//$(elm).next("span").remove();
						$(elm).removeClass('required');
					}
					else
					{
						if($.inArray('required',classList) == -1)
						{							
							//$('<span id="required">invalid</span>').insertAfter(elm);							
							$(elm).addClass('required');	
						}
						else
						{
							//$(elm).next("span").html('invalid');
						}
						flag = 1;
						//$(elm).next("span").html('invalid');
					}				
				}
				else
				{
					//$(elm).next("span").remove();
					$(elm).removeClass('required');
				}
			}
	});
	
	$('#'+form_id+' :input[type=file].validate').map(function(index,elm){
	
			name = elm.name;
			id = elm.id;
			value = $(elm).val();
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);			
			
			//alert(name+'~~~'+id+'~~~'+value);
			if(value == '')
			{
				
				if($.inArray('required',classList) == -1)
				{						
					//$('<span id="required">required</span>').insertAfter(elm);
					$(elm).addClass('required');	
				}		
				
				flag = 1;
				
			}
			else if(value != '')
			{				
				//$(elm).next("span").remove();
				$(elm).removeClass('required');
				
			}
	});
	
	//alert('flag:'+flag);
	flag2 = 0;
	$('#'+form_id+' :input[type=radio].validate').map(function(index,elm){
		
			name = elm.name;
			value = elm.value;			
			//id = elm.id;
			checked = $(elm).is(':checked');
			/*alert(value);
			alert(checked);*/
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);			
			
			//alert(name+'~~~'+id+'~~~'+value);
			
			//alert('student : '+$('#'+form_id+' :input[type=radio]#student').is(':checked'));
			//alert('employee : '+$('#'+form_id+' :input[type=radio]#employee').is(':checked'));
			
			if($('#'+form_id+' :input[type=radio]#student').is(':checked') == false && $('#'+form_id+' :input[type=radio]#employee').is(':checked') == false)
			{
				$(elm).addClass('required');
				flag = 1;
			}
			
			/*if(value == 'student')
			{
				if(checked == false)
				{
					
					if($.inArray('required',classList) == -1)
					{						
						//$('<span id="required">required</span>').insertAfter(elm);
						$(elm).addClass('required');	
					}		
					
					flag = 1;
					
				}
			}
			
			if(value == 'employee')
			{
				if(checked == false)
				{
					
					if($.inArray('required',classList) == -1)
					{						
						//$('<span id="required">required</span>').insertAfter(elm);
						$(elm).addClass('required');	
					}		
					
					flag = 1;
					
				}
			}*/
			
			if(value == 'student')
			{
				if(checked == false)
				{
					/*
					if($.inArray('required',classList) == -1)
					{						
						//$('<span id="required">required</span>').insertAfter(elm);
						$(elm).addClass('required');	
					}		
					
					flag = 1;
					*/
				}
				else//(checked == true)
				{				
					//$(elm).next("span").remove();					
					flag2 = 1;					
					
					$('#'+form_id+' #employee_details :input[type=text].validate_inner').map(function(index,elm){
																									
						$(elm).removeClass('required');
						
					});
					
					$('#'+form_id+' #student_detail :input[type=text].validate_inner').map(function(index,elm){
	
							name = elm.name;
							id = elm.id;
							value = $(elm).val();
							
							// array of class applied
							classList = $(this).attr('class').split(/\s+/);			
							
							//alert(name+'~~~'+id+'~~~'+value);
							if(value == '')
							{
								
								if($.inArray('required',classList) == -1)
								{						
									//$('<span id="required">required</span>').insertAfter(elm);
									$(elm).addClass('required');	
								}		
								
								flag = 1;
								
							}
							else if(value != '')
							{				
								//$(elm).next("span").remove();
								$(elm).removeClass('required');
								
							}
					});
					
				}
			}
			
			if(value == 'employee')
			{
				if(checked == false)
				{
				/*	
					if($.inArray('required',classList) == -1)
					{						
						//$('<span id="required">required</span>').insertAfter(elm);
						$(elm).addClass('required');	
					}		
					
					flag = 1;*/
					
				}
				else //if(checked == true)
				{				
					//$(elm).next("span").remove();
					
					$('#'+form_id+' :input[type=radio].validate').map(function(index,elm){
						$(elm).removeClass('required');
					});
					$('#'+form_id+' #student_detail :input[type=text].validate_inner').map(function(index,elm){
																									
						$(elm).removeClass('required');
						
					});
					
					$('#'+form_id+' #employee_details :input[type=text].validate_inner').map(function(index,elm){
	
							name = elm.name;
							id = elm.id;
							value = $(elm).val();
							
							// array of class applied
							classList = $(this).attr('class').split(/\s+/);			
							
							//alert(name+'~~~'+id+'~~~'+value);
							if(value == '')
							{
								
								if($.inArray('required',classList) == -1)
								{						
									//$('<span id="required">required</span>').insertAfter(elm);
									$(elm).addClass('required');	
								}		
								
								flag = 1;
								
							}
							else if(value != '')
							{				
								//$(elm).next("span").remove();
								$(elm).removeClass('required');
								
							}
					});
					
				}
				
				//alert('flag2:'+flag2);
				if(flag2 == 1)
				{
					$('#'+form_id+' :input[type=radio].validate').map(function(index,elm){
						$(elm).removeClass('required');
					});	
				}
				
			}
			
			
	});
	//alert('flag2:'+flag2);
	//alert('flag:'+flag);
	$('#'+form_id+' select.validate').map(function(index,elm){
	
			name = elm.name;
			id = elm.id;
			value = $(elm).val();
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);			
			
			//alert(name+'~~~'+id+'~~~'+value);
			if(value == '')
			{
				if($.inArray('required',classList) == -1)
				{
					//$('<span id="required">Required</span>').insertAfter(elm);
					$(elm).addClass('required');	
				}				
				flag = 1;
			}
			else if(value != '')
			{
				//$(elm).next("span").remove();
				$(elm).removeClass('required');
			}
	});	
	
	
	$('#'+form_id+' textarea.validate').map(function(index,elm){
	
			name = elm.name;
			id = elm.id;
			value = $(elm).val();
			
			// array of class applied
			classList = $(this).attr('class').split(/\s+/);
		
			//alert(name+'~~~'+id+'~~~'+value);
			if(value == '')
			{
				if($.inArray('required',classList) == -1)
				{
					//$('<span id="required">Required</span>').insertAfter(elm);
					$(elm).addClass('required');	
				}				
				flag = 1;
			}
			else if(value != '')
			{
				//$(elm).next("span").remove();
				$(elm).removeClass('required');
			}
	});
		
	
	//alert(flag);
	//alert('flag~~'+flag);
	//return false;
	
	
	if(flag == 1)
		return false;
	else
	{
		/*if(form_id == 'contact_us')
		{
			quick_contact();
			return false;
		}
		if(form_id == 'request_demo_form')
		{
			request_demo_form();
			return false;
		}	*/
		
		check_captcha(form_id);
		return false;
		//return true;
	
	}
	//	return true
	

}


function submit_quick_contact()
{
	
	//alert('form submitted'); return false;
	$.ajax({
		   
		   type : 'POST',
		   url : site_url+'process.php?action=quick_contact',
		   data : $('#quick_contact').serialize(),
		   success : function(response){					
					//$('.alert-info').text('Instructor has been updated.');
					//alert(response);
					$("#quick_contact")[0].reset();
					$('#quick_contact_response').html('Thank you for contacting us.');
					//alert(response);
					
					// change captcha image
					document.getElementById('captcha').src= site_url+'captcha/captcha.php?'+Math.random();
					document.getElementById('captcha-form').focus();
					
		   }
		   
	 });	
}
