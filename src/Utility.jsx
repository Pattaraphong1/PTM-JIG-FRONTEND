export const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";

  if (userAgent.match(/Edg/i)) { // Microsoft Edge (Chromium-based)
    browserName = "Microsoft Edge";
  } else if (userAgent.match(/Chrome/i) && !userAgent.match(/Edg/i)) { // Google Chrome (ไม่รวม Edge)
    browserName = "Google Chrome";
  } else if (userAgent.match(/Firefox/i)) {
    browserName = "Mozilla Firefox";
  } else if (userAgent.match(/Safari/i) && !userAgent.match(/Chrome/i)) { // Safari (ไม่รวม Chrome)
    browserName = "Apple Safari";
  } else if (userAgent.match(/Trident/i) || userAgent.match(/MSIE/i)) { // Internet Explorer
    browserName = "Internet Explorer";
  } else if (userAgent.match(/Opera|OPR/i)) { // Opera
    browserName = "Opera";
  }

  return browserName;
};


export function loadTreeview() {
    $('[data-widget="treeview"]').each(function () {
        if ($(this).data('treeview-init') === undefined) {
            $(this).Treeview('init');
            $(this).data('treeview-init', true);
        }
    });
}

/*
====How to use====
import { detectBrowser, loadTreeview } from "./Utility";

    // load adminLTE treeview=======
    useEffect(() => { 
        if(detectBrowser() == "Microsoft Edge")
        {
            loadTreeview();
        }
    }, []);

*/    