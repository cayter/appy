{ pkgs ? import (builtins.fetchTarball {
  name = "nixpkgs-unstable-2023-07-08";
  url = "https://github.com/nixos/nixpkgs/archive/842e90934a352f517d23963df3ec0474612e483c.tar.gz";
}) {} }:

with pkgs;

mkShell {
  buildInputs = [
    bun
    gnupg
    playwright-test
    playwright-driver
    postgresql
  ];

  shellHook = ''source ./shell.sh'';
}