# Setup the terminal prompt.
export PS1="\[\033[1;32m\][nix-shell:\w]\$\[\033[0m\] "

# Add 'node_modules' binaries to the PATH.
export PATH="$PATH:$(pwd)/node_modules/.bin"
