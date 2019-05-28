module.exports = {
    "roots": [
        "<rootDir>/tests/jest"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "globals": {
        "ts-jest": {
            diagnostics: {
                warnOnly: true
            }
        }
    }
}