import { render, screen, fireEvent } from "@testing-library/react";
import ImcForm from "./ImcForm";
import { ImcContext } from "./ImcProvider";

// Mock de ImcService para evitar error con import.meta.env
jest.mock("../service/ImcService", () => ({
  calcularImc: jest.fn(),
}));

const setResultado = jest.fn();
const setError = jest.fn();

function renderWithContext() {
  render(
    <ImcContext.Provider
      value={{ resultado: null, setResultado, error: "", setError }}
    >
      <ImcForm />
    </ImcContext.Provider>
  );
}

describe("ImcForm validaciones", () => {
  beforeEach(() => {
    setResultado.mockClear();
    setError.mockClear();
  });

  test("altura no numérica", () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/Altura/i), {
      target: { value: "abc" },
    });
    fireEvent.change(screen.getByLabelText(/Peso/i), {
      target: { value: "70" },
    });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(setError).toHaveBeenCalledWith(
      expect.stringContaining(
        "Por favor, ingresa valores válidos (numéricos) para la altura."
      )
    );
  });

  test("peso no numérico", () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/Altura/i), {
      target: { value: "1.7" },
    });
    fireEvent.change(screen.getByLabelText(/Peso/i), {
      target: { value: "abc" },
    });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(setError).toHaveBeenCalledWith(
      expect.stringContaining(
        "Por favor, ingresa valores válidos (numéricos) para el peso."
      )
    );
  });

  test("altura negativa", () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/Altura/i), {
      target: { value: "-1.7" },
    });
    fireEvent.change(screen.getByLabelText(/Peso/i), {
      target: { value: "70" },
    });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(setError).toHaveBeenCalledWith(
      expect.stringContaining(
        "La altura debe ser un número positivo mayor a 0 metros."
      )
    );
  });

  test("peso negativo", () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/Altura/i), {
      target: { value: "1.7" },
    });
    fireEvent.change(screen.getByLabelText(/Peso/i), {
      target: { value: "-70" },
    });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(setError).toHaveBeenCalledWith(
      expect.stringContaining(
        "El peso debe ser un número positivo mayor a 0 kg."
      )
    );
  });

  test("altura mayor a 3", () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/Altura/i), {
      target: { value: "3.5" },
    });
    fireEvent.change(screen.getByLabelText(/Peso/i), {
      target: { value: "70" },
    });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(setError).toHaveBeenCalledWith(
      expect.stringContaining(
        "Por favor, ingresa valores válidos: altura máxima 3 m."
      )
    );
  });

  test("peso mayor a 500", () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/Altura/i), {
      target: { value: "1.7" },
    });
    fireEvent.change(screen.getByLabelText(/Peso/i), {
      target: { value: "600" },
    });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(setError).toHaveBeenCalledWith(
      expect.stringContaining(
        "Por favor, ingresa valores válidos: peso máximo 500 kg."
      )
    );
  });

  test("varios errores juntos", () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/Altura/i), {
      target: { value: "-1.7" },
    });
    fireEvent.change(screen.getByLabelText(/Peso/i), {
      target: { value: "600" },
    });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(setError).toHaveBeenCalledWith(
      expect.stringContaining("positivo mayor a 0")
    );
    expect(setError).toHaveBeenCalledWith(
      expect.stringContaining("peso máximo 500")
    );
  });
});
