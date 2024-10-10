export type reimbusementDTO = {
  Id: number;
  Tipo: number;
  EmpresaId: number;
  CentroCustoId: number;
  Status: number;
  Nome: string;
  Cpf: string;
  Telefone: string;
  Origem: boolean;
  Destino: boolean;
  Motivo: string;
  ReembolsoItemList?: ReembolsoItem[];
  InsertUserId: number;
  InsertDate: string;
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

export type ReembusementItem = {
  AnexoPath: Anexo[];
  Data: string;
  Id: number;
  InsertDate: string;
  InsertUserId: number;
  Quantidade: number;
  ReembolsoId: number;
  ReembolsoItemTipoId: string;
  ReembolsoItemTipoLabel: string;
  ValorSolicitado: number;
  ValorVigenciaAtual: number;
};

interface Anexo {
  Filename: string;
  OriginalName: string;
}
