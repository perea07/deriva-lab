function Footer({ size }) {
    console.log(size);
    return (
        <footer className="text-center" style={{ paddingTop: size }}>
            <p>© 2025 - By Wandy Rivera & Yeison Perea</p>
        </footer>
    );
}

export default Footer;