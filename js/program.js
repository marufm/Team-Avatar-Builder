$(document).on('ready', function(){
	avatar_maker.init();
});

var avatar_maker = {
	init : function(){


		// Check for the various File API support.
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                // Great success! All the File APIs are supported.
            } else {
                alert('The File APIs are not fully supported in this browser.');
            }
            
            jQuery.event.props.push('dataTransfer');     
                        
            // listen to body grag & drop

            var bodyelement = $('#drop_area_box');

            bodyelement.bind('dragover', function(thisEvent) {   // using dragover instead of dragenter as it wasn't firing and causing erros
                thisEvent.stopPropagation();
                thisEvent.preventDefault();
                            
                thisEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
                            
                $(this).addClass('over');
                            
                return false;
            });

            bodyelement.bind('dragleave', function() {
                $(this).removeClass('over');
                return false;
            });

            bodyelement.bind('drop', function(thisEvent) {
                thisEvent.stopPropagation();
                thisEvent.preventDefault();
                $(this).removeClass('over');
                $('#working_msg').show();
               	$('#drop_area_box').hide();

                var files = thisEvent.dataTransfer.files; // FileList object
                // Loop through the FileList and render image files as thumbnails.
                for (var i = 0, f; f = files[i]; i++) {

                    if (!f.type.match('image.*')) {
                        $('#working_msg').hide();
                        $('#drop_area_box').show();
                        alert('Thats not an image file dummy, try again');
                        break;
                    }

                    var reader = new FileReader();
                    // Closure to capture the file information.
                    reader.onload = (function(theFile) {
                        return function(e) {
                            var id = theFile.name.substr(0, theFile.name.lastIndexOf('.'));
                           	avatar_maker.create_pieces(e.target.result, id);

                        };
                    })(f);
                    // Read in the image file as a data URL.
                    reader.readAsDataURL(f);
                }
            });

	}, /* END init() */
	create_pieces : function(img_data, img_name){
		for (var i = 0; i < 25; i++) {
			var the_piece = $('<div />', {class: 'piece'});
            var img_wrapper = $('<div />', {class: 'img_wrap'});
			
			var the_img = $('<img />', {src: img_data});
			var the_label = $('<p />', {class: 'label'});
			the_label.html(img_name);


			img_wrapper.append(the_img);
            the_piece.append(img_wrapper);

			the_piece.append(the_label);
			$('#image_out').append(the_piece);
		}
		$('#working_msg').hide();
		$('#print_msg').show();
		
	} /* END create_peices() */
}