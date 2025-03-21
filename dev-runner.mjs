import { spawn } from 'child_process'

const runScript = (name, path) => {
    const proc = spawn('npm', ['run', 'dev'], {
        cwd: path,
        stdio: 'inherit',
        shell: true,
    })

    proc.on('close', (code) => {
        console.log(`${name} exited with code ${code}`)
    })
}

runScript('Server', './server')
runScript('Client', './client')
