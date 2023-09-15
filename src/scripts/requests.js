import { toast } from "./renderToast.js";

const baseUrl = "http://localhost:6278";
const inicializadoraHeaderComum = {
  "content-type": "application/json",
};
const red = "#C96047";
const green = "#22966D";

export async function cadastraUsuario(objetoRegisterBody) {
  const novoUsuario = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: inicializadoraHeaderComum,
    body: JSON.stringify(objetoRegisterBody)
  })
  .then((response) => {
    if (response.ok) {
      const responseJson = response.json().then((response) => {
        toast("cadastro realizado com sucesso", green)

        setTimeout(()=>{
          window.location.replace("./login.html");
        }, 4900)

        
        return response
      });
      return responseJson;
    } else {
      response.json().then(({error}) => 
        toast(error, red))  
    }
  });
  return novoUsuario;
}

export async function todasEmpresasCadastradas() {
  const empresas = await fetch(`${baseUrl}/companies`, {
    method: "GET",
    headers: inicializadoraHeaderComum,
  }).then((response) => {
    if (response.ok) {
      const listaEmpresas = response
        .json()
        .then((responseJson) => responseJson);
      return listaEmpresas;
    } else {
      response.json().then((responseError) => {
        alert(responseError);
      });
    }
  });
  return empresas;
}

export async function EmpresasPorSetor(setorName) {
  const empresasFiltradas = await fetch(`${baseUrl}/companies/${setorName}`, {
    method: "GET",
    headers: inicializadoraHeaderComum,
  }).then((response) => {
    if (response.ok) {
      const listaEmpresasFIltradas = response
        .json()
        .then((responseJson) => responseJson);

      return listaEmpresasFIltradas;
    } else {
      response.json().then(({ error }) => {
        alert(error);
      });
    }
  });
  return empresasFiltradas;
}

export async function setoresDasEmpresas() {
  const Setores = await fetch(`${baseUrl}/sectors`, {
    method: "GET",
    headers: inicializadoraHeaderComum,
  }).then((response) => {
    if (response.ok) {
      const listaComTodosSetores = response
        .json()
        .then((responseJson) => responseJson);

      return listaComTodosSetores;
    } else {
      response.json().then((responseJson) => {
        alert(responseJson);
      });
    }
  });

  return Setores;
}

export async function fazLogin(objetoLoginBody) {
  const tokenRetornado = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: inicializadoraHeaderComum,
    body: JSON.stringify(objetoLoginBody),
  }).then((response) => {
    if (response.ok) {
      const objetoRetornado = response.json().then(({ token }) => {
        localStorage.setItem("@empresa:tokenDoUsuario", JSON.stringify(token));
        return token;
      });
      return objetoRetornado;
    } else {
      response.json().then(({ error }) => {
        toast(error, red)
      });
    }
    return tokenRetornado;
  });
}

function criaInicializador() {
  const tokenDoLocalStorage = JSON.parse(
    localStorage.getItem("@empresa:tokenDoUsuario")
  );

  const inicializadorComToken = {
    "content-type": "application/json",
    Authorization: `Bearer ${tokenDoLocalStorage}`,
  };

  return inicializadorComToken;
}

export async function validaUsuario() {
  const inicializador = criaInicializador();

  const validacao = await fetch(`${baseUrl}/auth/validate_user`, {
    method: "GET",
    headers: inicializador,
  }).then((response) => {
    if (response.ok) {
      const booleanoDoObjetoRetornado = response.json().then(({ is_admin }) => {
        localStorage.setItem("@empresa:is_admin", JSON.stringify(is_admin));
        toast("login realizado com sucesso", green)
        if (is_admin) {
          
          setTimeout(()=>{
            window.location.replace("../pages/dashboardAdmin.html");
          }, 5000)
        } else {          
          setTimeout(()=>{
            window.location.replace("../pages/dashboardUsuario.html")
          }, 5000)
        }

        return is_admin;
      });
      return booleanoDoObjetoRetornado;
    } else {
      response.json().then((responseError) => console.log(responseError));
    }
  });
  return validacao;
}


export async function informacoesUsuarioLogado() {
  const inicializador = criaInicializador();
  const informacoesUsuarioLogado = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: inicializador,
  }).then((response) => {
    if (response.ok) {
      const objetoInfUserRetornado = response
        .json()
        .then((responseJson) => responseJson);

      return objetoInfUserRetornado;
    } else {
      response.json().then((responseError) => {
        alert(responseError);
      });
    }
  });
  return informacoesUsuarioLogado;
}

export async function todosFuncionariosMsmDepartamento() {
  const inicializador = criaInicializador();
  const todosFuncionarios = await fetch(
    `${baseUrl}/users/departments/coworkers`,
    {
      method: "GET",
      headers: inicializador,
    }
  ).then(async (response) => {
    if (response.ok) {
      const listaObjDepartamentoListaUsers = await response.json();
      console.log(listaObjDepartamentoListaUsers);
      return listaObjDepartamentoListaUsers;
    } else {
      response.json().then((responseError) => {
        alert(responseError);
      });
    }
  });
  return todosFuncionarios;
}

export async function todosDepQUsuarioLogTrabalha() {
  const inicializador = criaInicializador();
  const todosDepQtrabalha = await fetch(`${baseUrl}/users/departments`, {
    method: "GET",
    headers: inicializador,
  }).then((response) => {
    if (response.ok) {
      const listaDepQTrabalha = response
        .json()
        .then(({ departments }) => departments);

      return listaDepQTrabalha;
    } else {
      response.json().then((responseError) => {
        alert(responseError);
      });
    }
  });

  return todosDepQtrabalha;
}

export async function atualizaInfUsuarioLogado(objetoUpdateBody) {
  const inicializador = criaInicializador();
  const atualizaInfUsuarioLog = await fetch(`${baseUrl}/users`, {
    method: "PATCH",
    headers: inicializador,
    body: JSON.stringify(objetoUpdateBody),
  }).then((response) => {
    if (response.ok) {
      const atualizarInf = response.json().then((responseJson) => responseJson);
      return atualizarInf;
    } else {
      response.json().then((responseError) =>  responseError);
    }
  });
  return atualizaInfUsuarioLog;
}


export async function todosFuncionariosCadastrados() {
  const inicializador = criaInicializador();

  const ListaTodosFuncionarios = await fetch(`${baseUrl}/users`, {
    method: "GET",
    headers: inicializador,
  }).then((response) => {
    if (response.ok) {
      const arrayObjetos_funcionarios = response
        .json()
        .then((responseJson) => responseJson);
      return arrayObjetos_funcionarios;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return ListaTodosFuncionarios;
}

export async function todosDepCadastrados() {
  const inicializador = criaInicializador();

  const listaTodosDep = await fetch(`${baseUrl}/departments`, {
    method: "GET",
    headers: inicializador,
  }).then((response) => {
    if (response.ok) {
      const arrayObjetos_departamentos = response
        .json()
        .then((responseJson) => responseJson);
      return arrayObjetos_departamentos;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return listaTodosDep;
}

export async function todosDepDeUmaEmpresa(company_id) {
  const inicializador = criaInicializador();

  const departamentosDaEmpresa = await fetch(
    `${baseUrl}/departments/${company_id}`,
    {
      method: "GET",
      headers: inicializador,
    }
  ).then((response) => {
    if (response.ok) {
      const arrayObjetos_todosDepDaEmpresa = response
        .json()
        .then((responseJson) => responseJson);
      return arrayObjetos_todosDepDaEmpresa;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return departamentosDaEmpresa;
}

export async function todosFuncionariosNaoContratados() {
  const inicializador = criaInicializador();

  const funcionariosNaoContratados = await fetch(
    `${baseUrl}/admin/out_of_work`,
    {
      method: "GET",
      headers: inicializador,
    }
  ).then((response) => {
    if (response.ok) {
      const arrayObjetos_funcionariosNaoCadastrados = response
        .json()
        .then((responseJson) => responseJson);
      return arrayObjetos_funcionariosNaoCadastrados;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return funcionariosNaoContratados;
}

export async function deletaUsuario(usuario_id) {
  const inicializador = criaInicializador();

  const UsuarioDeletado = await fetch(
    `${baseUrl}/admin/delete_user/${usuario_id}`,
    {
      method: "DELETE",
      headers: inicializador,
    }
  ).then((response) => {
    if (response.ok) {
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return UsuarioDeletado;
}

export async function deletaDepartamento(departamento_id) {
  const inicializador = criaInicializador();
  const DepartamentoDeletado = await fetch(
    `${baseUrl}/departments/${departamento_id}`,
    {
      method: "DELETE",
      headers: inicializador,
    }
  ).then((response) => {
    if (response.ok) {
      toast("departamento deletado com sucesso", green)
    } else {
      response.json().then((responseError) =>  responseError);
    }
  });
  return DepartamentoDeletado;
}

export async function cadastraEmpresa(objetoNovaEmpresaBody) {
  const inicializador = criaInicializador();

  const objetoNovaEmpresa = await fetch(`${baseUrl}/companies`, {
    method: "POST",
    headers: inicializador,
    body: JSON.stringify(objetoNovaEmpresaBody),
  }).then((response) => {
    if (response.ok) {
      const objetoEnviado = response
        .json()
        .then((responseJson) => responseJson);

      return objetoEnviado;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return objetoNovaEmpresa;
}

export async function cadastraNovoDepartamento(ObjetoNovoDepartamentoBody) {
  const inicializador = criaInicializador();

  const objetoNovoDepartamento = await fetch(`${baseUrl}/departments`, {
    method: "POST",
    headers: inicializador,
    body: JSON.stringify(ObjetoNovoDepartamentoBody),
  }).then((response) => {
    if (response.ok) {
      const objetoNovoDepRetornado = response.json().then((responseJson) => responseJson);
      return objetoNovoDepRetornado;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return objetoNovoDepartamento;
}

export async function contrataFuncionarioParaUmDepartamento(  objetoContrataFuncBOdy) {
  const inicializador = criaInicializador();

  const objetoContratarFuncionarioParaUmDep = await fetch(
    `${baseUrl}/departments/hire/`,
    {
      method: "PATCH",
      headers: inicializador,
      body: JSON.stringify(objetoContrataFuncBOdy),
    }
  ).then((response) => {
    if (response.ok) {
      const objetoUsuarioComDep = response.json().then((responseJson) =>toast("funcionario contratado com sucesso", green)
      );
      return objetoUsuarioComDep;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return objetoContratarFuncionarioParaUmDep;
}

export async function demiteFuncionarioDoDepartamento(user_id) {
  const inicializador = criaInicializador();

  const objetoDemiteFuncionarioDep = await fetch(
    `${baseUrl}/departments/dismiss/${user_id}`,
    {
      method: "PATCH",
      headers: inicializador,
    }
  ).then((response) => {
    if (response.ok) {
      const objetoUsuarioSemDep = response.json().then((responseJson) =>{ 

          return responseJson
          }
        );
      return objetoUsuarioSemDep;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return objetoDemiteFuncionarioDep;
}

export async function atualizaDescricaoDeUmDepartamento(
  department_id,
  objeto1PropriedadeBOdy
) {
  const inicializador = criaInicializador();
  const objetoAlteraDescricaoDep = await fetch(
    `${baseUrl}/departments/${department_id}`,
    {
      method: "PATCH",
      headers: inicializador,
      body: JSON.stringify(objeto1PropriedadeBOdy),
    }
  ).then((response) => {
    if (response.ok) {
      const objetoRetornado = response.json().then((responseJson) => responseJson);
      return objetoRetornado;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return objetoAlteraDescricaoDep;
}

export async function atualizaModoDeTrabalhoNivelDoFuncionario(
  user_id,
  objeto2propriedadesBody
) {
  const inicializador = criaInicializador();
  const atualiza2DadosDoFuncionario = await fetch(
    `${baseUrl}/admin/update_user/${user_id}`,
    {
      method: "PATCH",
      headers: inicializador,
      body: JSON.stringify(objeto2propriedadesBody),
    }
  ).then((response) => {
    if (response.ok) {
      const objetoInfUsuarioCom2PropAtualizadas = response.json().then((responsejson) => responsejson
      );
      return objetoInfUsuarioCom2PropAtualizadas;
    } else {
      response.json().then((responseError) => alert(responseError));
    }
  });
  return atualiza2DadosDoFuncionario;
}