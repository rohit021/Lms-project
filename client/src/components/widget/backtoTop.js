import React, { useState, useEffect } from 'react';
import {makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    ButtonContainer: {
        position: "fixed",
        bottom: "32px",
        right: "32px",
        alignItems: "center",
        height: "32px",
        width:  "32px",
        justifyContent:"center",
        zIndex: "1000",
        cursor: "pointer",
        animation: "fadeIn 0.3s",
        opacity: 0.5,
        background: "#01579b",
        borderRadius: "4px",
        transition: "opacity 0.4s, color ease-in-out 0.2s, background ease-in-out 0.2s",        
        "&:hover": {
            opacity: 1
          },
    },
  }));

const BackToTopButton = () => {
    const classes = useStyles();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.pageYOffset > 400) {
        setShowButton(true);
      } else if (showButton && window.pageYOffset <= 400) {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scroll({top: 0, left: 0, behavior: 'smooth' }) 
  };

  return (
    <div className={classes.ButtonContainer} ButtonContainer style={{display: showButton ? 'flex' : 'none'}} onClick={scrollToTop}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </div>
  );
};

export default BackToTopButton;