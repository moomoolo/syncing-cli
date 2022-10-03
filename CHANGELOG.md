# Changelog

## [Unreleased]

## [1.3.0] - 2022-10-03

### Added
 - `syncing diff -v`: show file difference detail
 - `syncing diff -r`: compare in reverse order
 - 'default old' and 'default new' tips

### Changed
 - abandon `chalk`, use ansi color control instead

## [1.2.0] - 2022-10-03

### Changed
 - Format time to "yyyy-MM-dd HH:mm:ss"

### Fixed
 - Get last modify time recursively

## [1.1.0] - 2022-10-02

### Changed
 - Updated log color

## [1.0.0] - 2022-10-02

### Added
 - `syncing config`: config directories
 - `syncing config list`: list config
 - `syncing diff`: show difference between directories
 - `syncing diff -l`: choose latest directory to compare
 - `syncing sync`: sync directories
 - `syncing watch`: watch directories and sync changes in real time