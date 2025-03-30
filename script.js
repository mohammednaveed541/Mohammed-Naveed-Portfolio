document.addEventListener("DOMContentLoaded", () => {
  // Initialize Feather icons
  feather.replace()

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const menuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active")
    const isOpen = mobileNav.classList.contains("active")
    menuBtn.innerHTML = isOpen ? feather.icons["x"].toSvg() : feather.icons["menu"].toSvg()
  })

  // Navigation active state
  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll(".nav-link")

  // Cursor glow effect
  const cursorGlow = document.querySelector(".cursor-glow")

  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.transform = `translate(${e.clientX - 128}px, ${e.clientY - 128}px)`
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const sectionId = this.getAttribute("data-section")
      const section = document.getElementById(sectionId)

      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        mobileNav.classList.remove("active")
        menuBtn.innerHTML = feather.icons["menu"].toSvg()

        // Update active state
        document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
          link.classList.remove("active")
        })

        document.querySelectorAll(`[data-section="${sectionId}"]`).forEach((link) => {
          link.classList.add("active")
        })
      }
    })
  })

  // Scroll spy for navigation
  function updateActiveSection() {
    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
        currentSection = section.getAttribute("id")
      }
    })

    if (currentSection) {
      document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
        link.classList.remove("active")
      })

      document.querySelectorAll(`[data-section="${currentSection}"]`).forEach((link) => {
        link.classList.add("active")
      })
    }
  }

  window.addEventListener("scroll", updateActiveSection)

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-progress")

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width")
      bar.style.width = `${width}%`
    })
  }

  // Animate skill circles on scroll
  const skillCircles = document.querySelectorAll(".circle .mask.full, .circle .fill")

  function animateSkillCircles() {
    skillCircles.forEach((circle) => {
      const parent = circle.closest(".skill-circle")
      const percentageEl = parent.querySelector(".percentage")
      const percentage = Number.parseFloat(percentageEl.textContent)
      const rotationAngle = (percentage / 100) * 180

      circle.style.setProperty("--rotation-angle", `${rotationAngle}deg`)
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "skills") {
          setTimeout(() => {
            animateSkillBars()
            animateSkillCircles()
          }, 300)
        }
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Here you would typically send the form data to a server
      // For this example, we'll just show a success message
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }

  // Initialize the page
  updateActiveSection()
})

