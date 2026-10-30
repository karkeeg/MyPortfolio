from playwright.sync_api import sync_playwright
import time

def verify(page):
    # Wait a bit for the server to spin up
    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")
    time.sleep(2) # Give framer-motion animations a moment to settle

    # Scroll down slightly to make the background more obvious
    page.evaluate("window.scrollBy(0, 100)")
    time.sleep(1)
    page.screenshot(path="hero_ai_bg.png")

    # Scroll to skills section
    page.locator("#skills").scroll_into_view_if_needed()
    time.sleep(1)
    page.screenshot(path="skills_3d_bg.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            verify(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
