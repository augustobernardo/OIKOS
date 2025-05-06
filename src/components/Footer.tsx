export default function Footer() {
  const currentYear = new Date().getFullYear();

  const logo = "/OIKOS.png";

  return (
    <footer className="w-full py-6 px-4 bg-background border-t border-border mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="OIKÓS Logo" className="h-8 w-auto mr-2" />
        </div>

        <div className="text-center md:text-right">
          <p className="text-sm text-muted-foreground">
            © {currentYear} OIKÓS - Retiro Espiritual. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
