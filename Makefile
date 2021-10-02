.PHONY: run
run:
	cd wasm && wasm-pack build --release
	cd app && npm i && npm start
