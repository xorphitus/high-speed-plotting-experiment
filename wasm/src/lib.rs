use wasm_bindgen::prelude::*;
use plotters::prelude::*;
use plotters::style::{WHITE, RED};
use plotters_canvas::CanvasBackend;

type DrawResult<T> = Result<T, Box<dyn std::error::Error>>;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn draw_wasm_line_chart(canvas_id: &str, data: &[f32]) {
    match draw(canvas_id, data) {
        Err(e) => {
            unsafe {
                log(&format!("wasm log: {}", e));
            }
        },
        _ => {}
    }
}

fn draw(canvas_id: &str, data: &[f32]) -> DrawResult<impl Fn((i32, i32)) -> Option<(f32, f32)>> {
    let backend = CanvasBackend::new(canvas_id).expect("cannot find canvas");
    let root = backend.into_drawing_area();
    let font: FontDesc = ("sans-serif", 20.0).into();

    root.fill(&WHITE)?;

    let mut chart = ChartBuilder::on(&root)
        .margin(20)
        .caption("this is a caption", font)
        .x_label_area_size(30)
        .y_label_area_size(30)
        .build_cartesian_2d(0.2f32..10000.2f32, -1f32..1f32)?;

    chart.configure_mesh().x_labels(3).y_labels(3).draw()?;
    chart.draw_series(LineSeries::new(
        data.iter().enumerate().map(|(i, x)| (i as f32, *x)),
        &RED,
    ))?;

    root.present()?;
    return Ok(chart.into_coord_trans());
}
