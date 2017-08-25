import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class SinglePageApplicationFilter implements Filter {

    public void init(FilterConfig filterConfig) throws ServletException { }
    public void destroy() { }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (!(request instanceof HttpServletRequest)) {
            return;
        }
        HttpServletRequest req = (HttpServletRequest) request;

        if (isAllowed(req)) {
            chain.doFilter(request, response);
        } else { // forward every other request to index page
            HttpServletResponse res = (HttpServletResponse) response;
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0
            res.setDateHeader("Expires", 0); // Proxies.
            req.getRequestDispatcher("/index.html").forward(request, response);
        }
    }

    private boolean isAllowed(HttpServletRequest req) {
        List<String> allowed = Collections.singletonList("/index.html");
        for (String path : allowed) {
            if (req.getServletPath().startsWith(path)) {
                return true;
            }
        }
        return false;
    }
}
