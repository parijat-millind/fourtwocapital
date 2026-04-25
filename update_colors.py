import re

with open('index.html', 'r') as f:
    html = f.read()

# Update Tailwind setup
old_config = """                    colors: {
                        primary: {
                            DEFAULT: '#90EE90',
                            dark: '#76C776',
                        },
                    },"""

new_config = """                    colors: {
                        primary: {
                            DEFAULT: '#0B1F3A',
                            dark: '#081528',
                        },
                        secondary: {
                            DEFAULT: '#2F5D8C',
                            dark: '#214365',
                        },
                        accent: {
                            DEFAULT: '#D4AF37',
                            dark: '#B8912A',
                        },
                        lightbg: '#F5F7FA',
                    },"""
html = html.replace(old_config, new_config)

# Update body bg color
html = html.replace('@apply font-sans antialiased bg-white text-slate-900;', '@apply font-sans antialiased bg-lightbg text-slate-900;')

# Replace old green primary with gold accent for buttons and links
html = html.replace('shadow-primary', 'shadow-accent')
html = html.replace('border-primary', 'border-accent')
html = html.replace('border-t-primary', 'border-t-accent')
html = html.replace('text-primary', 'text-accent')
html = html.replace('bg-primary/', 'bg-secondary/') # Glows to secondary
html = html.replace('bg-primary-dark', 'bg-accent-dark')
html = html.replace('bg-primary', 'bg-accent') # Most buttons and highlights
html = html.replace('decoration-primary', 'decoration-accent')
html = html.replace('ring-primary', 'ring-accent')
html = html.replace('text-accent-dark', 'text-accent-dark')

# Now apply Deep Navy Blue (#0B1F3A) to Headers, Nav, Footer, and Key sections

# Navbar
html = html.replace('className="fixed w-full z-50 flex justify-center bg-white border-b border-slate-100 shadow-sm"', 'className="fixed w-full z-50 flex justify-center bg-primary text-white border-b border-primary-dark shadow-sm"')
html = html.replace('className="max-w-7xl w-full px-6 py-4 flex justify-between items-center bg-white"', 'className="max-w-7xl w-full px-6 py-4 flex justify-between items-center bg-primary"')
html = html.replace('text-slate-700 hover:text-accent transition-colors', 'text-slate-300 hover:text-accent transition-colors')

# Footer
html = html.replace('<footer className="py-12 border-t border-slate-100 mx-6">', '<footer className="py-12 bg-primary text-white w-full">')
html = html.replace('<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">', '<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-6">')

# Key Sections currently using slate-900
html = html.replace('bg-slate-900', 'bg-primary')
# Secondary Sections currently using slate-50/50 -> should be white or lightbg
html = html.replace('bg-slate-50/50', 'bg-lightbg')

# Update specific sections to ensure readability and correct usage
# e.g., text-slate-900 inside dark sections (like buttons) needs to be careful
# button text inside accent is text-slate-900 -> text-primary for better contrast
html = html.replace('text-slate-900', 'text-primary')

with open('index.html', 'w') as f:
    f.write(html)
