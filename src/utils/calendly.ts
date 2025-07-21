// Calendly integration utility
export const openCalendly = () => {
  // PrivéFi demo call scheduling link
  const calendlyUrl = 'https://calendly.com/privefi';
  
  // Open Calendly in a new tab
  window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
};

// Alternative: Embed Calendly widget (if you prefer inline scheduling)
export const embedCalendly = (elementId: string) => {
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  
  script.onload = () => {
    // @ts-ignore - Calendly global object
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/privefi',
        parentElement: document.getElementById(elementId),
        prefill: {},
        utm: {}
      });
    }
  };
  
  document.head.appendChild(script);
};