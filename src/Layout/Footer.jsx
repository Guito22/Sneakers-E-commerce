// links are not functional, it is just an example
import "./footer.css"
import { Link } from "react-router-dom"

export default function Footer(){
    return(
        <footer>
            <section>
                <div>
                    <h3>Customer Service</h3>
                    <Link to="">Contact Us</Link>
                    <Link to="">Shipping</Link>
                    <Link to="">Returns</Link>
                    <Link to="">FAQ</Link>

                </div>
                <div>
                    <h3>Company</h3>
                    <Link to="">About Us</Link>
                    <Link to="">Careers</Link>
                    <Link to="">Press</Link>
                    <Link to="">Affiliates</Link>
                </div>
                <div>
                    <h3>Follow Us</h3>
                    <Link to="">Instagram</Link>
                    <Link to="">Facebook</Link>
                    <Link to="">Twitter</Link>
                    <Link to="">Pinterest</Link>
                </div>
            </section>

            <p id="copyrightText">© 2024 Sneaker Lounge. All Rights Reserved</p>
        </footer>
    )
}