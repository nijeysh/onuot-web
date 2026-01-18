interface FooterProps {
  updatedAt: string;
}

const Footer = ({ updatedAt }: FooterProps) => {
  const formatUpdateTime = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-update">
          마지막 업데이트: {formatUpdateTime(updatedAt)}
        </p>
        <p className="footer-copyright">
          &copy; 2026 Weather App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
