import "./Footer.css"




function App() {
  return (
    <footer className="footer footer-black footer-white">
        <div className="credits ml-auto">
          <span className="copyright">
            © {new Date().getFullYear()}, made with {" "}
            <i className="fa fa-heart heart" /> by Haitam Jebari
          </span>
        </div>
    </footer>
  )
}

export default App