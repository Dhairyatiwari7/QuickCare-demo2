import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HealthBuddy</h3>
            <p className="text-sm">Your trusted healthcare companion</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-sky-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-sky-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-sky-300">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-sm hover:text-sky-300">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-sm hover:text-sky-300">
                  Start Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-sky-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">123 Health Street, Medical City</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@healthbuddy.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">&copy; 2023 HealthBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

