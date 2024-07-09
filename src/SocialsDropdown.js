import React, { useState } from 'react';

const SocialsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { name: 'Website', url: 'https://jennercoineth.com' },
    { name: 'X Account', url: 'https://x.com/jennercoineth' },
    { name: 'Telegram', url: 'https://t.me/JennerCoinPortal' }
  ];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="text-teal-300 hover:text-teal-100 transition duration-200 hover:glow"
          onClick={() => setIsOpen(!isOpen)}
        >
          Socials
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="block px-4 py-2 text-sm text-teal-300 hover:bg-gray-700 hover:text-teal-100"
                role="menuitem"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialsDropdown;
