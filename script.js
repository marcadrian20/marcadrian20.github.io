function showAppInfo(projectId) {
    const modal = document.getElementById('appModal');
    // Find the project container that has the class "app-icon" and the correct projectId
    const appIcon = document.querySelector(`#${projectId}`);
    const appData = appIcon.querySelector('.app-data');
    
    // Ensure the appData exists
    if (appData) {
        document.getElementById('appTitle').textContent = appData.dataset.title;
        document.getElementById('appDescription').textContent = appData.dataset.description;
        document.getElementById('appRepo').href = appData.dataset.repo;
    
        // Display the modal
        modal.style.display = 'flex';
    } else {
        console.error("appData not found for project: " + projectId);
    }
    // document.getElementById('grid').style.display = 'none';
    document.getElementById('terminalModal').style.display = 'none';
}


function closeModal() {
    document.getElementById('appModal').style.display = 'none';
    document.getElementById('grid').style.display = 'grid';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('appModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Terminal functionality
let commandHistory = [];
let historyPointer = 0;

function showTerminal() {
    const modal = document.getElementById('terminalModal');
    closeModal();
    modal.style.display = 'flex';
    document.getElementById('command-input').focus();
}

function closeTerminal() {
    document.getElementById('terminalModal').style.display = 'none';
}

function handleCommand(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('command-input');
        const command = input.value.trim();
        input.value = '';
        
        if (command) {
            commandHistory.push(command);
            historyPointer = commandHistory.length;
            processCommand(command);
        }
    } else if (event.key === 'ArrowUp') {
        if (historyPointer > 0) {
            historyPointer--;
            document.getElementById('command-input').value = commandHistory[historyPointer];
        }
    } else if (event.key === 'ArrowDown') {
        if (historyPointer < commandHistory.length - 1) {
            historyPointer++;
            document.getElementById('command-input').value = commandHistory[historyPointer];
        }
    }
}

function processCommand(command) {
    const output = document.getElementById('terminal-output');
    const args = command.split(' ');
    
    // Add command to output
    output.innerHTML += `<div class="output-line"><span class="terminal-command">A:\> ${command}</span></div>`;
    
    // Process commands
    switch(args[0].toLowerCase()) {
        case 'help':
            output.innerHTML += `
                <div class="output-line">Available commands:</div>
                <div class="output-line">help - Show this help message</div>
                <div class="output-line">about - Show about me information</div>
                <div class="output-line">projects - List all projects</div>
                <div class="output-line">repo [project] - Open project repository</div>
                <div class="output-line">cls - Clear screen</div>
                <div class="output-line">exit - Close terminal</div>
            `;
            break;
            
        case 'about':
            output.innerHTML += `
                <div class="output-line">Name: Litoiu Marc-Adrian, prefer to be called Marc</div>
                <div class="output-line">Bio: Currently I am pursuing greater heights in the digital logic and microprocessor design, but I find myself passionate in the world of software too. </div>
                <div class="output-line">For now, I am working on a highly cofigurable RISC-V core that can hopefully boot GNU/Linux with a graphic interface. While tending to it, i am also working on "OSDOS", a DOS-like system meant for x86. Its aim is for me to study and better understand operating systems under the hood</div>
                <div class="output-line">There is also WILLY, my custom made hexapod/quadruped SpiderBOT. He was made first as a college project, but hopefully will turn out to be more than that.</div>
                <div class="output-line">As for other passions, I am quite fond of anything related to cars and cats.</div>
                <div class="output-line">For more info on my projects, type "projects"</div>
                `;
            break;
            
        case 'projects':
            output.innerHTML += `
                <div class="output-line">Available projects:</div>
                <div class="output-line">- project1: OSDOS</div>
                <div class="output-line">- project2: W.I.L.L.Y. The SpiderBot</div>
                <div class="output-line">- project3: My-CPU</div>
                <div class="output-line">- project4: 16BIT_CPU_MULTISIM</div>
                <div class="output-line">- project5: Platformvania</div>
            `;
            break;
            
        case 'repo':
            if(args[1]) {
                const project = args[1].toLowerCase();
                const repos = {
                    project1: 'https://github.com/marcadrian20/OSDOS',
                    project2: 'https://github.com/marcadrian20/Willy',
                    project3: 'https://github.com/marcadrian20/My-CPU',
                    project4: 'https://github.com/marcadrian20/16BIT_CPU_MULTISIM',
                    project5: 'https://github.com/marcadrian20/Platformvania',
                };
                
                if(repos[project]) {
                    window.open(repos[project], '_blank');
                    output.innerHTML += `<div class="output-line">Opening ${project} repository...</div>`;
                } else {
                    output.innerHTML += `<div class="output-line">Project not found!</div>`;
                }
            }
            break;
            
        case 'cls':
            output.innerHTML = '';
            break;
        case 'exit':
            closeTerminal();
            break;
        default:
            output.innerHTML += `<div class="output-line">Command not found: ${command}</div>`;
    }

    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
}

// Add CRT startup effect
function crtStartup() {
    const body = document.body;
    body.style.opacity = '0';
    
    // Simulate CRT warm-up
    setTimeout(() => {
        body.style.transition = 'opacity 2s';
        body.style.opacity = '1';
    }, 500);
    
    // Add static noise effect
    const noise = document.createElement('div');
    noise.className = 'crt-noise';
    noise.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            rgba(0, 255, 0, 0.05),
            rgba(0, 255, 0, 0.05) 1px,
            transparent 1px,
            transparent 2px
        );
        pointer-events: none;
        z-index: 9999;
        animation: noise 0.1s infinite;
    `;
    document.body.appendChild(noise);
    
    // Add startup sound
    // const audio = new Audio('crt-startup.mp3');
    // audio.play();
}

// Initialize CRT effect
document.addEventListener('DOMContentLoaded', crtStartup);
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        const now = new Date();
        document.getElementById('current-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);
});
