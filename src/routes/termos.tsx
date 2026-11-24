import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout, CONTACT_EMAIL } from "@/components/pelvi/LegalLayout";

const SITE_URL = "https://www.soupelvi.com.br";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de uso — soupelvi" },
      {
        name: "description",
        content:
          "Termos de uso do site e do cadastro com teste gratuito de 14 dias da plataforma soupelvi, para fisioterapeutas pélvicas.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/termos` }],
  }),
  component: Termos,
});

function Termos() {
  return (
    <LegalLayout title="Termos de uso">
      <p>
        Estes Termos de uso regulam o acesso ao site <strong>www.soupelvi.com.br</strong> e a
        criação de conta na plataforma soupelvi, com teste gratuito de 14 dias. Ao navegar no site
        ou enviar o formulário de cadastro, você declara ter lido e concordado com estes Termos e
        com a <Link to="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>1. Quem somos</h2>
      <p>
        A soupelvi é uma plataforma para fisioterapeutas pélvicas, operada por{" "}
        <strong>Blvckship Tecnologia LTDA</strong>, inscrita no CNPJ sob o nº 69.304.059/0001-70,
        com sede no Edifício Primavera Office, em Florianópolis/SC. Contato:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. O que este site oferece</h2>
      <p>
        O site apresenta a plataforma e permite que profissionais de fisioterapia pélvica informem
        nome e e-mail para criar uma conta e experimentar a plataforma gratuitamente por 14 dias.
        Após o envio do formulário, você recebe por e-mail um link para concluir o cadastro.
      </p>

      <h2>3. Cadastro e teste gratuito</h2>
      <ul>
        <li>Você deve ser maior de 18 anos e informar dados verdadeiros e que sejam seus.</li>
        <li>
          O teste gratuito dura 14 dias e não exige contratação. Ao final do período, você decide se
          deseja contratar a plataforma, o que é feito dentro dela.
        </li>
        <li>
          A contratação e o uso continuado da plataforma estão sujeitos às condições apresentadas no
          momento da contratação, que poderão exigir a aceitação de termos específicos.
        </li>
        <li>
          Você pode pedir a exclusão da sua conta e dos seus dados a qualquer momento, pelo nosso
          contato.
        </li>
      </ul>

      <h2>4. Comunicações</h2>
      <p>
        Ao se cadastrar, você concorda em receber e-mails sobre sua conta, o período de teste e
        novidades da plataforma. Não enviamos spam e os e-mails promocionais trazem opção de
        descadastro.
      </p>

      <h2>5. Dados pessoais</h2>
      <p>
        Coletamos nome e e-mail, informados por você, além de métricas agregadas de navegação por
        meio de analytics sem cookies, tratados conforme a Lei Geral de Proteção de Dados (Lei nº
        13.709/2018). Os detalhes estão na <Link to="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>6. Uso adequado</h2>
      <p>Ao usar o site, você se compromete a não:</p>
      <ul>
        <li>fornecer dados falsos ou de terceiros sem autorização;</li>
        <li>
          tentar acessar áreas restritas, comprometer a segurança ou sobrecarregar a infraestrutura
          do site (por exemplo, com envios automatizados ou em massa);
        </li>
        <li>usar o site para fins ilícitos ou que violem direitos de terceiros.</li>
      </ul>

      <h2>7. Propriedade intelectual</h2>
      <p>
        A marca soupelvi, o logotipo, os textos, as imagens e o código do site pertencem à Blvckship
        Tecnologia LTDA ou são usados com autorização. É proibida a reprodução ou o uso comercial
        sem permissão prévia por escrito.
      </p>

      <h2>8. Isenção de responsabilidade</h2>
      <p>
        O conteúdo do site tem caráter informativo e não constitui orientação clínica, diagnóstico
        ou recomendação de conduta profissional. Empregamos esforços razoáveis para manter o site
        disponível e correto, mas ele é oferecido no estado em que se encontra, sem garantia de
        funcionamento ininterrupto.
      </p>

      <h2>9. Links de terceiros</h2>
      <p>
        O site pode conter links para serviços de terceiros. Não controlamos esses sites e não nos
        responsabilizamos pelo seu conteúdo ou pelas suas políticas.
      </p>

      <h2>10. Alterações destes Termos</h2>
      <p>
        Podemos atualizar estes Termos a qualquer momento. A versão vigente fica sempre nesta
        página, com a data da última atualização. Mudanças relevantes serão comunicadas por e-mail
        às pessoas cadastradas.
      </p>

      <h2>11. Lei aplicável e foro</h2>
      <p>
        Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de
        Florianópolis/SC para resolver qualquer controvérsia, ressalvado o foro do consumidor quando
        aplicável.
      </p>

      <h2>12. Contato</h2>
      <p>
        Dúvidas sobre estes Termos: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
