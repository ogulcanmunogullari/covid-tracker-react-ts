function Navigation() {
  return (
    <ul className="container flex justify-between p-1 sm:mx-auto">
      <li className="bg-[#6C63FF] text-white p-4 sm:p-5 rounded-lg">
        <a href="https://ogulcanmunogullari.netlify.app/" target="_blank">
          Portfolio
        </a>
      </li>
      <li className="bg-[#6C63FF] text-white p-4 sm:p-5 rounded-lg">
        <a
          href="https://github.com/ogulcanmunogullari?tab=repositories"
          target="_blank">
          Github
        </a>
      </li>
      <li className="bg-[#6C63FF] text-white p-4 sm:p-5 rounded-lg">
        <a
          href="https://www.linkedin.com/in/ogulcanmunogullari/"
          target="_blank">
          Linkedin
        </a>
      </li>
    </ul>
  )
}

export default Navigation
