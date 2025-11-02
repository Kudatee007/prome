import footerLogo from "../assets/footer-logo.png";

const Footer = () => {
  return (
    <div className="bg-[#3E3E3E] pt-15 pb-6 px-6 lg:px-20">
      <section className="flex flex-wrap justify-between">
        <div>
          <img src={footerLogo} alt="" />
        </div>
        <div className="pt-10">
          <h4 className="text-white text-2xl pb-6">Company</h4>
          <ul className="text-white font-normal text-base space-y-2">
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/faq">Privacy & Notice</a>
            </li>
            <li>
              <a href="/faq">Mobile Apps</a>
            </li>
          </ul>
        </div>
        {/* customers */}
        <div className="pt-10">
          <h4 className="text-white text-2xl pb-6">Customers</h4>
          <ul className="text-white font-normal text-base space-y-2">
            <li>
              <a href="/about">Service Near Me</a>
            </li>
            <li>
              <a href="/faq">Cost Estimates</a>
            </li>
          </ul>
        </div>
        {/* professionals */}
        <div className="pt-10">
          <h4 className="text-white text-2xl pb-6">Customers</h4>
          <ul className="text-white font-normal text-base space-y-2">
            <li>
              <a href="/about">FAQ</a>
            </li>
            <li>
              <a href="/faq">Contracter Leads</a>
            </li>
          </ul>
        </div>
        {/* connect with us */}
        <div className="pt-10">
          <h4 className="text-white text-2xl pb-6">Connect With Us</h4>
          <ul className="text-white font-normal text-base space-y-2">
            <li>
              <a href="/about">Prome Blog</a>
            </li>
            <li>
              <a href="/faq">Facebook</a>
            </li>
            <li>
              <a href="/faq">Twitter</a>
            </li>
            <li>
              <a href="/faq">Linkedln</a>
            </li>
          </ul>
        </div>
      </section>
      <hr className="text-white p-1 mt-16" />
      <div className="py-5">
        <span className="text-white text-center">
          Copyright 2022 Prome. All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
