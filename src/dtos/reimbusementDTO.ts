export type reimbusementDTO = {
  CentroCustoId: number;
  Cpf: string;
  Destino: boolean;
  EmpresaId: number;
  Id: number;
  InsertDate: string;
  InsertUserId: number;
  Motivo: string;
  Nome: string;
  Origem: boolean;
  ReembolsoItemList: ReembolsoItem[];
  Status: number;
  Telefone: string;
  Tipo: number;
};

type ReembolsoItem = {
  Id: number;
  ReembolsoId: number;
  ReembolsoEmpresaId: number;
  Data: string;
  ReembolsoItemTipoId: string;
  ReembolsoItemTipoLabel: string;
  ValorSolicitado: number;
  ValorVigenciaAtual: number;
  Quantidade: number;
  AnexoPath: string;
  InsertUserId: number;
  InsertDate: string;
};
