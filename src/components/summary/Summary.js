import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

export const Summary = (story, link) => {
    swal({
      title: story.title,
      text: `Summary: ${story.summary}
            Grade: ${story.grade}`,
      grade: story.grade,
      buttons: [true, "Play"]
    }).then(function(isConfrm) {
        if (isConfrm)    
            window.location = link;
        
    });
    
  };

export default Summary;