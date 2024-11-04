   <script>

    // Get UTM params from the URL or from localStorage(on the initial page load it will be empty, this is for subsequent pages)
    var currentUrlParams = new URLSearchParams(window.location.search);
    var storedUTMs = JSON.parse(localStorage.getItem('initialUTMParams')) || {};

    // Capture new UTM params from the URL if present and store in localStorage
    currentUrlParams.forEach(function(value, key) {
        if (!storedUTMs[key]) {
            storedUTMs[key] = encodeURIComponent(value);
        }
    });

    if (Object.keys(storedUTMs).length > 0) {
        localStorage.setItem('initialUTMParams', JSON.stringify(storedUTMs));
    }

    // Append UTM parameters to the current URL if they're missing
    var currentUrl = new URL(window.location.href);
    var currentParams = new URLSearchParams(currentUrl.search);
    Object.keys(storedUTMs).forEach(function(param) {
        if (!currentParams.has(param)) {
            currentParams.append(param, storedUTMs[param]);
        }
    });

    // If the URL was updated with UTM parameters, replace the current URL without reloading
    if (currentUrl.search !== currentParams.toString()) {
        currentUrl.search = currentParams.toString();
        window.history.replaceState({}, document.title, currentUrl.toString());
    }

    // Apply stored UTM parameters to all links on the page
    var links = document.querySelectorAll('a');
    links.forEach(function(link) {
        var hrefUrl = link.getAttribute('href');
        if (hrefUrl && !hrefUrl.startsWith('#') && !hrefUrl.startsWith('javascript:')) {
            var linkUrl = new URL(hrefUrl, window.location.origin);
            var linkParams = new URLSearchParams(linkUrl.search);
            Object.keys(storedUTMs).forEach(function(param) {
                if (!linkParams.has(param)) {
                    linkParams.append(param, storedUTMs[param]);
                }
            });
            linkUrl.search = linkParams.toString();
            link.setAttribute('href', linkUrl.toString());
        }
    });

</script>

